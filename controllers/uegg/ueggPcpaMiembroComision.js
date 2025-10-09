const UeggPcpaMiembroComision = require('../../models/uegg').uegg_pcpa_miembro_comision ; 
const sequelize = UeggPcpaMiembroComision.sequelize;

module.exports = {   
                                                                                                                                                                                                                                                                                                                                                                                                                            
    list(req, res) {
        return UeggPcpaMiembroComision
            .findAll({})
            .then((ueggPcpaMiembroComision) => res.status(200).send(ueggPcpaMiembroComision)) 
            .catch((error) => { res.status(400).send(error); });
    },
    // Metodo anteriori que lista todos los miembros de comision sin agruparlos
    /* async listMiembrosComision(req, res) {
      console.log('req', req.params);
   
      return sequelize.query(`select  upue.id as id_pcpa_unidad_educativa,  upue.cod_sie,upue.desc_ue, upue.desc_municipio , 
      upue.desc_municipio  , upue.desc_nivel , upue.modalidad  , upue.nombres_director ||'-'|| upue.apellidos_director as nombres_director
      , upcon.id, upcon.fecha_registro  , upcon.check_diagnostico_pcpa , upcon.fecha_aprobacion, upcon.vigencia_aprobacion
      , upct.id as id_comision_tipo, upct.desc_comision_tipo 
      , upmt.id as id_miembro_tipo, upmt.desc_miembro_tipo
      , upmc.id as id_miembro, upmc.nombres_miembro as nombres_miembro
        from uegg_pcpa_construccion upcon 
          join uegg_pcpa_unidad_educativa upue   on upcon.id_pcpa_unidad_educativa = upue.id 
          join uegg_pcpa_miembro_comision upmc  on upmc.id_pcpa_construccion = upcon.id
          join uegg_pcpa_miembro_tipo upmt      on upmt.id = upmc.id_pcpa_miembro_tipo 
          join uegg_pcpa_comision_tipo upct     on upct.id = upmc.id_pcpa_comision_tipo      
        WHERE upue.cod_ue = ${req.params.id} and upue.estado = 'ACTIVO' and upmc.estado = 'ACTIVO'  order by id_pcpa_comision_tipo ASC,  id_miembro_tipo ASC`, {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true //  ||  ' ' || upmc.apellidos_miembro 
        })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { res.status(400).send(error); });
    }, */
    // Nuevo metodo que agrupa los nombres de los miembros por tipo de comision y tipo de miembro
    /* async listMiembrosComision(req, res) {
        console.log('req', req.params);

        return sequelize.query(`
            SELECT 
                upue.id AS id_pcpa_unidad_educativa,
                upue.cod_sie,
                upue.desc_ue,
                upue.desc_municipio,
                upue.desc_nivel,
                upue.modalidad,
                upue.nombres_director || '-' || upue.apellidos_director AS nombres_director,
                upcon.id AS id_construccion,
                upcon.fecha_registro,
                upcon.check_diagnostico_pcpa,
                upcon.fecha_aprobacion,
                upcon.vigencia_aprobacion,
                upct.id AS id_comision_tipo,
                upct.desc_comision_tipo,
                upmt.id AS id_miembro_tipo,
                upmt.desc_miembro_tipo,
                STRING_AGG(upmc.nombres_miembro, ', ') AS nombres_miembros
            FROM uegg_pcpa_construccion upcon
            JOIN uegg_pcpa_unidad_educativa upue ON upcon.id_pcpa_unidad_educativa = upue.id
            JOIN uegg_pcpa_miembro_comision upmc ON upmc.id_pcpa_construccion = upcon.id
            JOIN uegg_pcpa_miembro_tipo upmt ON upmt.id = upmc.id_pcpa_miembro_tipo
            JOIN uegg_pcpa_comision_tipo upct ON upct.id = upmc.id_pcpa_comision_tipo
            WHERE upue.cod_ue = ${req.params.id} 
              AND upue.estado = 'ACTIVO' 
              AND upmc.estado = 'ACTIVO'
            GROUP BY 
                upue.id, upue.cod_sie, upue.desc_ue, upue.desc_municipio, 
                upue.desc_nivel, upue.modalidad, upue.nombres_director, upue.apellidos_director,
                upcon.id, upcon.fecha_registro, upcon.check_diagnostico_pcpa, 
                upcon.fecha_aprobacion, upcon.vigencia_aprobacion,
                upct.id, upct.desc_comision_tipo,
                upmt.id, upmt.desc_miembro_tipo
            ORDER BY id_comision_tipo ASC, id_miembro_tipo ASC
        `, {
            type: sequelize.QueryTypes.SELECT
        })
        .then((subcentros) => res.status(200).send(subcentros))
        .catch((error) => { res.status(400).send(error); });
    }, */
    async listMiembrosComision(req, res) {
        console.log('req', req.params);

        return sequelize.query(`
            SELECT 
                upue.id AS id_pcpa_unidad_educativa,
                upue.cod_sie,
                upue.desc_ue,
                upue.desc_municipio,
                upue.desc_nivel,
                upue.modalidad,
                upue.nombres_director || '-' || upue.apellidos_director AS nombres_director,
                upcon.id AS id,
                upcon.fecha_registro,
                upcon.check_diagnostico_pcpa,
                upcon.fecha_aprobacion,
                upcon.vigencia_aprobacion,
                upct.id AS id_comision_tipo,
                upct.desc_comision_tipo,
                upmt.id AS id_miembro_tipo,
                upmt.desc_miembro_tipo,
                STRING_AGG(upmc.nombres_miembro, ', ') AS nombres_miembro
            FROM uegg_pcpa_construccion upcon
            JOIN uegg_pcpa_unidad_educativa upue ON upcon.id_pcpa_unidad_educativa = upue.id
            JOIN uegg_pcpa_miembro_comision upmc ON upmc.id_pcpa_construccion = upcon.id
            JOIN uegg_pcpa_miembro_tipo upmt ON upmt.id = upmc.id_pcpa_miembro_tipo
            JOIN uegg_pcpa_comision_tipo upct ON upct.id = upmc.id_pcpa_comision_tipo
            WHERE upue.cod_ue = ${req.params.id} 
              AND upue.estado = 'ACTIVO' 
              AND upmc.estado = 'ACTIVO'
            GROUP BY 
                upue.id, upue.cod_sie, upue.desc_ue, upue.desc_municipio, 
                upue.desc_nivel, upue.modalidad, upue.nombres_director, upue.apellidos_director,
                upcon.id, upcon.fecha_registro, upcon.check_diagnostico_pcpa, 
                upcon.fecha_aprobacion, upcon.vigencia_aprobacion,
                upct.id, upct.desc_comision_tipo,
                upmt.id, upmt.desc_miembro_tipo
            ORDER BY id_comision_tipo ASC, id_miembro_tipo ASC
        `, {
            type: sequelize.QueryTypes.SELECT
        })
        .then((subcentros) => res.status(200).send(subcentros))
        .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaMiembroComision
            .findByPk(req.params.id)
            .then((ueggPcpaMiembroComision) => { 
                console.log(ueggPcpaMiembroComision);
                if (!ueggPcpaMiembroComision) {
                    return res.status(404).send({
                        message: 'UeggPcpaMiembroComision no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaMiembroComision); 
            })
            .catch((error) => res.status(400).send(error));
    },
    // Nuevo metodo para insertar varios miembros de comision a la vez, los nombres vienen en un solo campo separados por coma
    /* add(req, res) {
        return UeggPcpaMiembroComision.create({
            id_pcpa_construccion: req.body.id_pcpa_construccion,
            id_pcpa_comision_tipo: req.body.id_pcpa_comision_tipo,
            id_pcpa_miembro_tipo: req.body.id_pcpa_miembro_tipo,
            orden: req.body.orden,
            nombres_miembro: req.body.nombres_miembro,
            apellidos_miembro: req.body.apellidos_miembro,
            check_miembro_comision: req.body.check_miembro_comision,
                      
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaMiembroComision => res.status(201).send(ueggPcpaMiembroComision))
          .catch(error => res.status(400).send(error));
    }, */
    // Nuevo metodo para insertar varios miembros de comision a la vez, los nombres vienen en un solo campo separados por coma
    add(req, res) {
        try {
            // Tomamos los nombres y los separamos por coma, eliminando espacios extra
            const nombresArray = req.body.nombres_miembro
                .split(',')
                .map(nombre => nombre.trim())
                .filter(nombre => nombre.length > 0); // eliminamos elementos vacíos

            // Preparamos las promesas para insertar cada registro
            const promesas = nombresArray.map(nombre => {
                return UeggPcpaMiembroComision.create({
                    id_pcpa_construccion: req.body.id_pcpa_construccion,
                    id_pcpa_comision_tipo: req.body.id_pcpa_comision_tipo,
                    id_pcpa_miembro_tipo: req.body.id_pcpa_miembro_tipo,
                    orden: req.body.orden,
                    nombres_miembro: nombre,
                    apellidos_miembro: req.body.apellidos_miembro,
                    check_miembro_comision: req.body.check_miembro_comision,
                    estado: 'ACTIVO',
                    usu_cre: req.body.usu_cre,
                    fec_cre: req.body.fec_cre
                });
            });

            // Ejecutamos todas las inserciones en paralelo
            Promise.all(promesas)
                .then(resultados => res.status(201).send(resultados))
                .catch(error => res.status(400).send(error));

        } catch (error) {
            res.status(400).send(error);
        }
    },
    
    update(req, res) {
        console.log(UeggPcpaMiembroComision);
        return UeggPcpaMiembroComision.findByPk(req.params.Id, {})
          .then(ueggPcpaMiembroComision => {
            if (!ueggPcpaMiembroComision) {
              return res.status(404).send({
                message: "ueggPcpaMiembroComision Not Found"
              });
            }
            return ueggPcpaMiembroComision
              .update({
                id_pcpa_construccion: req.body.id_pcpa_construccion || ueggPcpaMiembroComision.id_pcpa_construccion,
                id_pcpa_comision_tipo: req.body.id_pcpa_comision_tipo || ueggPcpaMiembroComision.id_pcpa_comision_tipo,
                id_pcpa_miembro_tipo: req.body.id_pcpa_miembro_tipo || ueggPcpaMiembroComision.id_pcpa_miembro_tipo,
                orden: req.body.orden || ueggPcpaMiembroComision.orden,
                nombres_miembro: req.body.nombres_miembro || ueggPcpaMiembroComision.nombres_miembro,
                apellidos_miembro: req.body.apellidos_miembro || ueggPcpaMiembroComision.apellidos_miembro,
                check_miembro_comision: req.body.check_miembro_comision || ueggPcpaMiembroComision.check_miembro_comision,
                
                estado: 'MODIFICADO',  
                usu_mod: 'ADMIN', //req.body.usu_mod ,
                fec_mod:  new Date() //req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaMiembroComision)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
  
      deleteLogico(req, res) { // en el front se llama    deleteMiembroComision
        console.log('comision : req.params.id: ',req.params.id );
     
  
        return UeggPcpaMiembroComision.findByPk(req.params.id, {})
            .then(ueggPcpaMiembroComision => {
              if (!ueggPcpaMiembroComision) {
                return res.status(404).send({
                  message: "ueggPcpaConstruccion Not Found"
                });
              }
              return ueggPcpaMiembroComision
                .update({
                 
                  estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod
                })
                .then(() =>{  
                   console.log(' *************SI INACTIVADO OK');
                   res.status(204).send(ueggPcpaMiembroComision)   })
                .catch(error => {
                  console.log(' *************ERROR INACTIVADO 1', error);
                  res.status(400).send(error)  });
            })
            .catch(error => {
              console.log(' *************ERROR INACTIVADO 2',  error);
              res.status(400).send(error)  });
      },   



      delete(req, res) {
        return UeggPcpaMiembroComision.findByPk(req.params.Id)
          .then(ueggPcpaMiembroComision => {
            if (!ueggPcpaMiembroComision) {
              return res.status(400).send({
                message: "ueggPcpaMiembroComision Not Found"
              });
            }
            return ueggPcpaMiembroComision
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }



};