from flask import Flask
from flask_socketio import SocketIO, send, emit, join_room, leave_room
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


@socketio.on('connect')
def connection():
    @socketio.on("request_info")
    def request_info(id):
        print("asdf", file=sys.stderr)
        emit('rahhh', 'asdf')

    @socketio.on('join')
    def on_join(data):
        if data:
            join_room(data)

    @socketio.on('leave')
    def on_leave(data):
        if data:
            leave_room(data)


if __name__ == "__main__":
    init_rooms(socketio)
    socketio.run(server, allow_unsafe_werkzeug=True)
