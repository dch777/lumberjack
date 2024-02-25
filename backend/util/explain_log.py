import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def explain_log(log):

    prompt = "I want you to act as a software developer. I want you to help \
backend developers debug and understand server errors. Provide a short and concise\
list of actionable items to begin addressing the issue."

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {
                "role": "user",
                "content": "Explain the following Apache error message and some possible steps to begin debugging: " + log,
            }
        ],
        model="gpt-3.5-turbo",
    )

    return chat_completion.choices[0].message.content
