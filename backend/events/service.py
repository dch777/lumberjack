from flask_socketio import send, rooms, join_room, leave_room
from app import socketio
from util.docker import client
import sys


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data, file=sys.stderr)


@socketio.on("request_info")
def handle_info_request(id):
    print("dsaf", file=sys.stderr)
    send(client.containers.get(id).stats(stream=False))


@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
