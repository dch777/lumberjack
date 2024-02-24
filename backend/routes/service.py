from flask import Blueprint, jsonify
from util.docker import client
import sys

service = Blueprint('service', __name__)


@service.route('/<string:id>')
def get_service(id):
    container = client.containers.get(id)
    return jsonify({id: {'name': container.name, 'labels': container.labels,
                         'status': container.status}})


@service.route('/<string:id>/logs')
def get_service_logs(id):
    container = client.containers.get(id)
    print(dir(container.attach_socket()), sys.stderr)
    return container.attach_socket()
