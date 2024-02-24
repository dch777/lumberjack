from util.docker import client
import threading
import json


def init_rooms(socketio):
    containers = client.containers.list()
    rooms = []
    for container in containers:
        rooms.append(threading.Thread(
            target=init_log_room, args=(container, socketio)))
        rooms.append(threading.Thread(
            target=init_stat_room, args=(container, socketio)))

    for room in rooms:
        room.start()


def init_log_room(container, socketio):
    for log in container.logs(stream=True):
        socketio.emit("log_data", log.decode(), room=container.id)


def init_stat_room(container, socketio):
    for stat in container.stats(stream=True):
        socketio.emit("stats", json.loads(stat.decode()), room=container.id)
