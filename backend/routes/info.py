from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from util.docker import client
from util.explain_log import explain_log
import sys

info = Blueprint('info', __name__)


@info.route('/containers/')
def containers():
    return jsonify({'containers': {container.id: {'name': container.name,
                                                  'status': container.status} for container in
                                   client.containers.list(all=True)}})


@info.route('/images/')
def images():
    return jsonify({'images': [image.id for image in client.images.list()]})


@info.route('/explain/', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def explain():
    print("[INFO] Log explanation requested", file=sys.stderr)
    data = request.json
    return explain_log(data['log'])
