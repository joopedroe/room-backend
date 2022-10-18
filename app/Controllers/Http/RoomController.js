'use strict';
const uuid = require('uuid');
const Room = use('App/Models/Room');

class RoomController {
  async index ({ request, response }) {
    let query = await Room.query().where('status', true);

    return query.fetch();
  }

  async store ({ auth, request, response }) {
    console.log('teste');
    const {name, type} = request.all();
    const cod_id = uuid.v4()
    const cod = cod_id.substring(6,0);
    const room = { name: name, type:type, code: cod, status: true, user_identification: cod_id};
    const new_room = await Room.create(room);
    return new_room;
  }

  async show ({ auth, params, response }) {
    const code = params.id;

    const room = await Room.query().where('code', code).fetch();
    return room;
  }

  async update ({ auth, params, request, response }) {
    const usuario = auth.user;
    const pacientes_ids = await pacientesIds(usuario);

    const { fotos, titulo } = request.only(['fotos', 'titulo']);

    const album = await Album.findOrFail(params.id);

    if (pacientes_ids.indexOf(album.paciente_id) === -1)
      return response.forbidden({ message: 'Você não tem permissão' });

    if (titulo) album.titulo = titulo;

    if (fotos) await album.fotos().sync(fotos);

    await album.save();

    return album;
  }

  async adiciona({ auth, params, request, response }) {
    const usuario = auth.user;
    const pacientes_ids = await pacientesIds(usuario);
    const fotos = request.input('fotos');

    const album = await Album.findOrFail(params.id);

    if (pacientes_ids.indexOf(album.paciente_id) === -1)
      return response.forbidden({ message: 'Você não tem permissão' });

    if (fotos) await album.fotos().attach(fotos);

    return response.ok({ message: 'Fotos adicionadas' });
  }

  async destroy ({ auth, params, response }) {
    const usuario = auth.user;
    const pacientes_ids = await pacientesIds(usuario);

    const album = await Album.findOrFail(params.id);

    if (pacientes_ids.indexOf(album.paciente_id) === -1)
      return response.forbidden({ message: 'Você não tem permissão' });
    await album.delete();

    return response.ok({ message: 'Album excluído' });
  }
}

module.exports = RoomController;