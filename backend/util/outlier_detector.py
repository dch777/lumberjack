import numpy as np
import pandas as pd
import fasttext
from sklearn.preprocessing import normalize
from sklearn.decomposition import TruncatedSVD
from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist


class OutlierDetectorWrapper:
    def __init__(self, text_column='event', n_clusters=4, n_components=5, random_state=42):
        self.data = pd.DataFrame()

        self.n_clusters = n_clusters
        self.n_components = n_components
        self.random_state = random_state
        self.text_column = text_column

        self.unfitted_data = 0

    def append(self, new_data):
        self.data = pd.concat([self.data, new_data], ignore_index=True)
        self.unfitted_data += len(new_data)

    def fit(self):
        self.unfitted_data = 0

        self.data[self.text_column].to_csv('events.txt', index=False)
        self.model = fasttext.train_unsupervised(
            'events.txt', model='skipgram')

        self.detector = OutlierDetector(
            n_clusters=self.n_clusters, n_components=self.n_components,
            random_state=self.random_state, fasttext_model=self.model
        )
        self.detector.fit(self.data[self.text_column])

    def detect_outliers(self):
        # Use the detector to find outliers in the current dataset
        return self.detector.detect_outliers()

    def predict_outliers(self, new_data):
        # Use the detector to predict outliers in new data (not appended)
        return self.detector.predict_outliers(new_data[self.text_column])

    def get_unfitted_data_size(self):
        # gets amount of data that's currently not fitted
        return self.unfitted_data

    def get_data_size(self):
        # gets all data size, including unfitted
        return self.data.shape[0]


class OutlierDetector:
    def __init__(self, n_clusters=4, n_components=5, random_state=42, fasttext_model=None):
        # Initialize FastText model
        if fasttext_model is None:
            # Load a pre-trained model or train here
            # Example: using a pre-trained model
            self.model = fasttext.load_model('cc.en.300.bin')
        else:
            self.model = fasttext_model

        self.svd = TruncatedSVD(n_components=n_components,
                                random_state=random_state)
        self.kmeans = KMeans(n_clusters=n_clusters, random_state=random_state)
        self.random_state = random_state

    def vectorize(self, data):
        # Vectorize data using FastText
        vectors = np.array([self.model.get_sentence_vector(text)
                           for text in data])
        return vectors

    def fit(self, data):
        # Vectorize the text data
        X = self.vectorize(data)
        X_normalized = normalize(X, norm='l2', axis=1)

        # Dimensionality reduction
        X_svd_normalized = self.svd.fit_transform(X_normalized)

        # Clustering
        self.kmeans.fit(X_svd_normalized)

        # Calculate distance to centroids
        centroids = self.kmeans.cluster_centers_
        distances = cdist(X_svd_normalized, centroids, 'euclidean')
        self.min_distances = distances.min(axis=1)

        # Calculate threshold for outliers
        q1 = np.percentile(self.min_distances, 25)
        q3 = np.percentile(self.min_distances, 75)
        iqr = q3 - q1
        self.threshold = q3 + (1.5 * iqr)

    def detect_outliers(self):
        outliers = np.where(self.min_distances > self.threshold)[0]
        return outliers

    def predict_outliers(self, new_data):
        # Apply the same transformations to the new data
        X_new = self.vectorize(new_data)
        X_new_normalized = normalize(X_new, norm='l2', axis=1)
        X_new_svd_normalized = self.svd.transform(X_new_normalized)

        # Calculate distance to centroids
        centroids = self.kmeans.cluster_centers_
        distances_new = cdist(X_new_svd_normalized, centroids, 'euclidean')
        min_distances_new = distances_new.min(axis=1)

        # Determine if they are outliers based on the threshold
        is_outlier = min_distances_new > self.threshold
        return is_outlier


# Example usage:
# Assuming you have your FastText model ready and your data loaded in `df_logs`
# model = fasttext.train_unsupervised('events.txt', model='skipgram')
# enhanced_detector = EnhancedDataClusterOutlierDetector(fasttext_model=model)
# enhanced_detector.append_and_refit(df_logs['event'].tolist())
# print("Outlier indices:", enhanced_detector.detect_outliers())
# print(enhanced_detector.predict_outliers(["Invalid user support", "Valid user, login successful"]))
