from flask import Blueprint, jsonify
from util.docker import client

info = Blueprint('info', __name__)


@info.route('/containers/')
def containers():
    return jsonify({'containers': {container.id: {'name': container.name,
                                                  'status': container.status} for container in
                                   client.containers.list(all=True)}})


@info.route('/images/')
def images():
    return jsonify({'images': [image.id for image in client.images.list()]})
