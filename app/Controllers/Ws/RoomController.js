"use strict"
const Room = use('App/Models/Room');
const rooms = {};
const users_rooms = {};
const message_rooms = {};

class RoomController {

    constructor({socket, request}) {
        this.socket = socket;
        this.request = request;
    }

    onMessage(data){
        console.log(this.socket.id)
        console.log(data);
    }

    async onEmit(params) {
        const code = params.code;
        const room = await Room.query().where('code', code).fetch();
        return room;
      }

      onRoom(params) {
        params.user_id = this.socket.id
        console.log(params);
        if(!rooms[params.code]){
            rooms[params.code]=[]
        }
        if(!users_rooms[params.code]){
            users_rooms[params.code]=[]
        }
        rooms[params.code].push({user: params.user, user_id: params.user_id});
        users_rooms[params.code].push(params.user_id);
        console.log(users_rooms[params.code])
        this.socket.broadcastToAll('class', {room:rooms[params.code], user: params.user, user_id: params.user_id})
      }

    onAdd_video(params){
        console.log(params);
        let list_link = params.link.split("=")
        console.log(list_link);
        const id_video = list_link[1]
        const link = `http://www.youtube.com/embed/${id_video}?autoplay=1&controls=0&start=0&showinfo=0`
        params.link = link;
        console.log(users_rooms)
        this.socket.broadcastToAll('video_room', params, users_rooms[params.code])
    }
}
 
module.exports = RoomController;