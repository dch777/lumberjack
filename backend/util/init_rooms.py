from util.docker import client
import threading


def init_rooms(socketio):
    containers = client.containers.list()
    rooms = []
    for container in containers:
        rooms.append(threading.Thread(
            target=init_container_room, args=(container, socketio)))

    for room in rooms:
        room.start()


def init_container_room(container, socketio):
    for log in container.logs(stream=True):
        socketio.emit("log_data", log)
