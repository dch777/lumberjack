from flask import Blueprint, jsonify, stream_with_context, Response
from util.docker import client
import sys

service = Blueprint('service', __name__)


@service.route('/<string:id>')
def get_service(id):
    container = client.containers.get(id)
    return jsonify({'service': {'name': container.name, 'labels': container.labels,
                                'status': container.status, 'id': container.id}})


@service.route('/<string:id>/logs')
def get_service_logs(id):
    container = client.containers.get(id)

    def generate():
        for line in container.logs().decode().split('\n'):
            yield line + '\n'

    return stream_with_context(generate())
