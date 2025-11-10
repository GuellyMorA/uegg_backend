const UeggEmbEstudianteEmbarazo = require('../../models/uegg').uegg_emb_estudiante_embarazo ; 
const sequelize = UeggEmbEstudianteEmbarazo.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteEmbarazo
            .findAll({})
            .then((ueggEmbEstudianteEmbarazo) => res.status(200).send(ueggEmbEstudianteEmbarazo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteEmbarazo
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteEmbarazo) => { 
                console.log(ueggEmbEstudianteEmbarazo);
                if (!ueggEmbEstudianteEmbarazo) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteEmbarazo no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteEmbarazo); 
            })
            .catch((error) => res.status(400).send(error));
    },
  getByCodRude(req, res) {  //  cod_ue=cod_sie
      console.log('req', req.params);

      return sequelize.query(`
      select uembest.id as id_emb_estudiante_embarazo,upcon.id as id_pcpa_construccion  ,  uembest.id_pcpa_unidad_educativa,
      id_emb_informe_embarazo, cod_rude, cedula_identidad, complemento, fec_nacimiento, nombres_estudiante, apellido_pat_estudiante,
      apellido_mat_estudiante, nivel, grado, edad, check_estudiante_discapacidad, dis_cognitiva, dis_visual, dis_auditiva, dis_motriz,
      dis_otro, check_estudiante_casada, check_estudiante_conviviente, uembest.estado
        from uegg_pcpa_construccion upcon                 
        join uegg_pcpa_unidad_educativa upue         on   upcon.id_pcpa_unidad_educativa = upue.id  
        join uegg_emb_estudiante_embarazo uembest    on uembest.id_pcpa_unidad_educativa = upue.id 
     
      WHERE uembest.cod_rude =  '${req.params.id}'  and upcon.estado in ('ACTIVO','MODIFICADO') and upue.estado in ('ACTIVO','MODIFICADO')  and uembest.estado in ('ACTIVO','MODIFICADO')
          
        `,               
        {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
        })
          .then((result) => {
            console.log('✅ Resultado de getByCodSie:', result);
            res.status(200).send(result);
          })
          .catch((error) => {
            console.error('❌ Error en getByCodSie:', error);
            res.status(400).send(error);
          });
        },
    add(req, res) {
        console.log('req: ', req.params);
        return UeggEmbEstudianteEmbarazo.create({
            id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa,
            id_emb_informe_embarazo: req.body.id_emb_informe_embarazo,
        
            cod_rude: req.body.cod_rude,
            cedula_identidad: req.body.cedula_identidad,
            complemento: req.body.complemento,
            fec_nacimiento: req.body.fec_nacimiento,
        
            nombres_estudiante: req.body.nombres_estudiante,
            apellido_pat_estudiante: req.body.apellido_pat_estudiante,
            apellido_mat_estudiante: req.body.apellido_mat_estudiante,
            nivel: req.body.nivel,
            grado: req.body.grado,
            edad: req.body.edad,

            check_estudiante_discapacidad: req.body.check_estudiante_discapacidad,
            dis_cognitiva: req.body.dis_cognitiva ,
            dis_visual: req.body.dis_visual ,
            dis_auditiva: req.body.dis_auditiva ,
            dis_motriz: req.body.dis_motriz ,
            dis_otro: req.body.dis_otro ,
        // Unión temprana
            
           // check_estudiante_casada: req.body.unionTemprana,
            check_estudiante_conviviente: req.body.unionTemprana,
     
            estado: req.body.estado ,
            usu_cre: req.body.usu_cre ,//   new Date('2013-03-10T02:00:00Z').toString()
            fec_cre: req.body.fec_cre  //  new Date().toISOString() 
          
        })
          .then(ueggEmbEstudianteEmbarazo => res.status(201).send(ueggEmbEstudianteEmbarazo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
          console.log('req: ', req.params);
        return UeggEmbEstudianteEmbarazo.findByPk(req.params.id, {})
          .then(ueggEmbEstudianteEmbarazo => {
            if (!ueggEmbEstudianteEmbarazo) {
              return res.status(404).send({
                message: "ueggEmbEstudianteEmbarazo Not Found"
              });
            }
            return ueggEmbEstudianteEmbarazo
              .update({

                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa || ueggEmbEstudianteEmbarazo.id_pcpa_unidad_educativa,
                id_emb_informe_embarazo: req.body.id_emb_informe_embarazo || ueggEmbEstudianteEmbarazo.id_emb_informe_embarazo,
            
                cod_rude: req.body.cod_rude || ueggEmbEstudianteEmbarazo.cod_rude,
                cedula_identidad: req.body.cedula_identidad || ueggEmbEstudianteEmbarazo.cedula_identidad,
                complemento: req.body.complemento || ueggEmbEstudianteEmbarazo.complemento,
                fec_nacimiento: req.body.fec_nacimiento || ueggEmbEstudianteEmbarazo.fec_nacimiento,
            
                nombres_estudiante: req.body.nombres_estudiante || ueggEmbEstudianteEmbarazo.nombres_estudiante,
                apellido_pat_estudiante: req.body.apellido_pat_estudiante || ueggEmbEstudianteEmbarazo.apellido_pat_estudiante,
                apellido_mat_estudiante: req.body.apellido_mat_estudiante || ueggEmbEstudianteEmbarazo.apellido_mat_estudiante,
                nivel: req.body.nivel || ueggEmbEstudianteEmbarazo.nivel,
                grado: req.body.grado || ueggEmbEstudianteEmbarazo.grado,
                edad: req.body.edad || ueggEmbEstudianteEmbarazo.edad,
                check_estudiante_discapacidad: req.body.check_estudiante_discapacidad || ueggEmbEstudianteEmbarazo.check_estudiante_discapacidad,
   
            dis_cognitiva: req.body.dis_cognitiva  || ueggEmbEstudianteEmbarazo.dis_cognitiva,
            dis_visual: req.body.dis_visual  || ueggEmbEstudianteEmbarazo.dis_visual,
            dis_auditiva: req.body.dis_auditiva || ueggEmbEstudianteEmbarazo.dis_auditiva ,
            dis_motriz: req.body.dis_motriz || ueggEmbEstudianteEmbarazo.dis_motriz ,
            dis_otro: req.body.dis_otro  || ueggEmbEstudianteEmbarazo.dis_otro,
        // Unión temprana
                
               // check_estudiante_casada: req.body.unionTemprana || ueggEmbEstudianteEmbarazo.check_estudiante_casada,
                check_estudiante_conviviente: req.body.unionTemprana || ueggEmbEstudianteEmbarazo.check_estudiante_conviviente,
                        
            estado: req.body.estado ?? ueggEmbEstudianteEmbarazo.estado,
            usu_mod: req.body.usu_mod ?? ueggEmbEstudianteEmbarazo.usu_mod, // Corregido: Asumiendo que quieres un fallback
            fec_mod: new Date()
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggEmbEstudianteEmbarazo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggEmbEstudianteEmbarazo.findByPk(req.params.Id)
          .then(ueggEmbEstudianteEmbarazo => {
            if (!ueggEmbEstudianteEmbarazo) {
              return res.status(400).send({
                message: "ueggEmbEstudianteEmbarazo Not Found"
              });
            }
            return ueggEmbEstudianteEmbarazo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
    
      getByRude(req, res) {
        console.log('req', req.params);
        return sequelize.query(`select * from public.uegg_emb_estudiante_embarazo where cod_rude = '${req.params.rude}' `, {
            type: sequelize.QueryTypes.SELECT, plain: true, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      }
  

};