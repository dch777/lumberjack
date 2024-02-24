from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
import sys

from util.docker import client
from util.init_rooms import init_rooms
from routes.info import info
from routes.service import service


server = Flask(__name__)
socketio = SocketIO(server, cors_allowed_origins='*')
CORS(server)

server.register_blueprint(info, url_prefix='/info')
server.register_blueprint(service, url_prefix='/service')


@socketio.on("request_info")
def init_container_room(id):
    print("asdfd", file=sys.stderr)
    container = client.containers.get(id)
    for log in container.logs(stream=True):
        emit("log_data", log)


@socketio.on('connect')
def test_connect():
    print("asdfd", file=sys.stderr)
    emit('my response')


@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)


if __name__ == "__main__":
    socketio.run(server, allow_unsafe_werkzeug=True)
