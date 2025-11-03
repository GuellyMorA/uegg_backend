const UeggPcpaIndicadoresEjecucion = require('../../models/uegg').uegg_pcpa_indicadores_ejecucion ; 
const sequelize = UeggPcpaIndicadoresEjecucion.sequelize;
module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaIndicadoresEjecucion
            .findAll({})
            .then((ueggPcpaIndicadoresEjecucion) => res.status(200).send(ueggPcpaIndicadoresEjecucion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaIndicadoresEjecucion
            .findByPk(req.params.id)
            .then((ueggPcpaIndicadoresEjecucion) => { 
                console.log(ueggPcpaIndicadoresEjecucion);
                if (!ueggPcpaIndicadoresEjecucion) {
                    return res.status(404).send({
                        message: 'UeggPcpaIndicadoresEjecucion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaIndicadoresEjecucion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    async listIndicadoresEjecucion(req, res) {
      console.log('req', req.params);

      return sequelize.query(`
        select upae.id as id_indicadores_ejecutadas,upae.id_pcpa_construccion  , upat.id as id_pcpa_indicadores_tipo, 
         upat.cod_indicadores   ,   upae.desc_indicadores  as desc_indicadores_ejecutadas,  upae.fec_ejecucion  , upae.estado   
            from uegg_pcpa_indicadores_ejecucion upae    
                join uegg_pcpa_indicadores_tipo  upat  on upae.id_pcpa_indicadores_tipo = upat.id    
                join uegg_pcpa_construccion upcon on upae.id_pcpa_construccion = upcon.id  
                      join uegg_pcpa_unidad_educativa upue   on upcon.id_pcpa_unidad_educativa = upue.id 
             WHERE upue.cod_ue = ${req.params.id}  and upue.estado in ('ACTIVO','MODIFICADO') and upae.estado in ('ACTIVO','MODIFICADO')
             order by   upae.id_pcpa_indicadores_tipo asc, id_indicadores_ejecutadas ASC  `,               
        {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
        })
          .then((result) => {
            console.log('✅ Resultado de listIndicadoresEjecucion:', result);
            res.status(200).send(result);
          })
          .catch((error) => {
            console.error('❌ Error en listIndicadoresEjecucion:', error);
            res.status(400).send(error);
          });
        },

    add(req, res) {
       console.log(req.params); 
        return UeggPcpaIndicadoresEjecucion.create({
              id_pcpa_indicadores_tipo: req.body.id_pcpa_indicadores_tipo,
              id_pcpa_construccion: req.body.id_pcpa_construccion,
            cod_indicadores: req.body.cod_indicadores,  
              desc_indicadores: req.body.desc_indicadores, 
              fec_ejecucion: req.body.fec_ejecucion,
           
             estado: req.body.estado ,
            usu_cre: req.body.usu_cre ,//   new Date('2013-03-10T02:00:00Z').toString()
            fec_cre: req.body.fec_cre  //  new Date().toISOString() 
          
        })
          .then(ueggPcpaIndicadoresEjecucion => res.status(201).send(ueggPcpaIndicadoresEjecucion))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(req.params.id); 
        return UeggPcpaIndicadoresEjecucion.findByPk(req.params.id, {})
          .then(ueggPcpaIndicadoresEjecucion => {
            if (!ueggPcpaIndicadoresEjecucion) {
              return res.status(404).send({
                message: "ueggPcpaIndicadoresEjecucion Not Found"
              });
            }
            return ueggPcpaIndicadoresEjecucion
              .update({
                id_pcpa_indicadores_tipo: req.body.id_pcpa_indicadores_tipo || ueggPcpaIndicadoresEjecucion.id_pcpa_indicadores_tipo,
                id_pcpa_construccion: req.body.id_pcpa_construccion  || ueggPcpaIndicadoresEjecucion.id_pcpa_construccion,
                cod_indicadores: req.body.cod_indicadores || ueggPcpaIndicadoresEjecucion.cod_indicadores,  
               desc_indicadores: req.body.desc_indicadores || ueggPcpaIndicadoresEjecucion.desc_indicadores, 
                fec_ejecucion: req.body.fec_ejecucion || ueggPcpaIndicadoresEjecucion.fec_ejecucion,                
                estado: req.body.estado ?? ueggPcpaIndicadoresEjecucion.estado,
                usu_mod: req.body.usu_mod ?? ueggPcpaIndicadoresEjecucion.usu_mod, // Corregido: Asumiendo que quieres un fallback
                fec_mod: new Date()
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaIndicadoresEjecucion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaIndicadoresEjecucion.findByPk(req.params.Id)
          .then(ueggPcpaIndicadoresEjecucion => {
            if (!ueggPcpaIndicadoresEjecucion) {
              return res.status(400).send({
                message: "ueggPcpaIndicadoresEjecucion Not Found"
              });
            }
            return ueggPcpaIndicadoresEjecucion
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }




};