
const Persona = require("../models").persona;


const sequelize = Persona.sequelize;

module.exports = {
  list(req, res) {
    return persona.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]]
    })
      .then(personas => res.status(200).send(personas))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Persona.findByPk(req.params.id)
      .then(persona => {
        if (!persona) {
          return res.status(404).send({
            message: "persona Not Found"
          });
        }
        return res.status(200).send(persona);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return Persona.create({
      idioma_materno_id: 48,
      genero_tipo_id: 1,
      sangre_tipo_id: 7,
      estadocivil_tipo_id: 1,
      carnet: req.body.carnet || persona.carnet,
      rda: 0,
      pasaporte: req.body.codSie || persona.pasaporte,
      paterno: req.body.nombre || persona.paterno,
      materno: req.body.nombre || persona.materno,
      nombre: req.body.nombre || persona.nombre,
      fecha_nacimiento: new Date(), //  new Date().getFullYear();
      segip_id: 1,
      complemento: '',
      es_extranjero: false,
      expedido_id: 0
    })
      .then(persona => res.status(201).send(persona))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    console.log(Persona);
    return Persona.findByPk(req.params.id, {})
      .then(persona => {
        if (!persona) {
          return res.status(404).send({
            message: "persona Not Found"
          });
        }
        return persona
          .update({
            nombre: req.body.nombre || persona.nombre,
            telefono: req.body.telefono || persona.telefono,
            rol_id: req.body.rol_id || persona.rol_id,
            username: req.body.username || persona.username,
            // password: req.body.password || persona.password,
            estado: !!req.body.estado
          })
          .then(() => res.status(200).send(persona))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Persona.findByPk(req.params.id)
      .then(persona => {
        if (!persona) {
          return res.status(400).send({
            message: "persona Not Found"
          });
        }
        return persona
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },



 

};
