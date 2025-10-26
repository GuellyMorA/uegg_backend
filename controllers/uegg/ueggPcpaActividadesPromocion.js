const UeggPcpaActividadesPromocion = require('../../models/uegg').uegg_pcpa_actividades_promocion ; 
const sequelize = UeggPcpaActividadesPromocion.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaActividadesPromocion
            .findAll({})
            .then((ueggPcpaActividadesPromocion) => res.status(200).send(ueggPcpaActividadesPromocion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    
async listActividadesPromocion(req, res) {
  console.log('req params:', req.params);
  const codUe = req.params.id; // Guardamos el ID para usarlo en 'replacements'

  try {
    const sqlQuery = `
      SELECT 
        upapU.id_actividades_promocion,
        upapU.id_pcpa_construccion,
        upapU.id_pcpa_actividades_tipo,
        upapU.nivel,
        upapU.cod_actividad,
        upapU.desc_actividades_promocion,
        upapU.check_actividad_tipo,
        upapU.orden,
        upapU.estado
      FROM (
        SELECT 
          upap.id AS id_actividades_promocion,
          upap.id_pcpa_construccion,
          upat.id AS id_pcpa_actividades_tipo,
          1 AS nivel,
          upat.cod_actividad,
          upat.desc_actividad AS desc_actividades_promocion,
            CASE   WHEN upap.estado IN ('ACTIVO', 'MODIFICADO') THEN true
                   ELSE false  END as check_actividad_tipo   ,
          upat.orden,
          upap.estado
        FROM uegg_pcpa_actividades_promocion upap
        JOIN uegg_pcpa_actividades_tipo upat 
          ON upap.id_pcpa_actividades_tipo = upat.id
        WHERE upap.nivel = 1

        UNION ALL

        SELECT 
          upap.id AS id_actividades_promocion,
          upap.id_pcpa_construccion,
          upatd.id AS id_pcpa_actividades_tipo,
          2 AS nivel,
          upatd.cod_actividad,
          upatd.desc_actividad AS desc_actividades_promocion,
             CASE   WHEN upap.estado IN ('ACTIVO', 'MODIFICADO') THEN true
                   ELSE false  END as check_actividad_tipo   ,
          upatd.orden,
          upap.estado
        FROM uegg_pcpa_actividades_promocion upap
        JOIN uegg_pcpa_actividades_tipo_det upatd 
          ON upap.id_pcpa_actividades_tipo = upatd.id
        WHERE upap.nivel = 2
      ) AS upapU
      JOIN uegg_pcpa_construccion upcon 
        ON upapU.id_pcpa_construccion = upcon.id
      JOIN uegg_pcpa_unidad_educativa upue 
        ON upcon.id_pcpa_unidad_educativa = upue.id
      WHERE upue.cod_ue = :cod_ue  -- ✅ CORRECCIÓN 2: Marcador de posición
            AND upue.estado in ( 'ACTIVO', 'MODIFICADO')
      ORDER BY upapU.id_actividades_promocion ASC, upapU.nivel ASC
    `;

    const resultados = await sequelize.query(sqlQuery, {
      replacements: { cod_ue: codUe }, // ✅ CORRECCIÓN 2: Reemplazo seguro
      type: sequelize.QueryTypes.SELECT,
      // plain: true, // ❌ CORRECCIÓN 1: Eliminado para obtener un array
      raw: true
    });

    console.log('🟢 Resultado de la consulta:');
    console.table(resultados); // Imprimirá '[]' (o los datos)
    res.status(200).send(resultados);

  } catch (error) {
    console.error('🔴 Error en la consulta:', error);
    res.status(400).send(error);
  }
},





    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaActividadesPromocion
            .findByPk(req.params.id)
            .then((ueggPcpaActividadesPromocion) => { 
                console.log(ueggPcpaActividadesPromocion);
                if (!ueggPcpaActividadesPromocion) {
                    return res.status(404).send({
                        message: 'UeggPcpaActividadesPromocion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaActividadesPromocion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
                console.log('req.params.id :' , req.params.id);
        return UeggPcpaActividadesPromocion.create({
            id_pcpa_construccion: req.body.id_pcpa_construccion,
            id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo,
             
            nivel: req.body.nivel,
            fec_aprobacion: req.body.fec_aprobacion,
            tiempo_vigencia: req.body.tiempo_vigencia,
            declaracion_jurada: req.body.declaracion_jurada,
            
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaActividadesPromocion => res.status(201).send(ueggPcpaActividadesPromocion))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log('req.params.id :' , req.params.id);
        return UeggPcpaActividadesPromocion.findByPk(req.params.id, {})
          .then(ueggPcpaActividadesPromocion => {
            if (!ueggPcpaActividadesPromocion) {
              return res.status(404).send({
                message: "ueggPcpaActividadesPromocion Not Found"
              });
            }
             return ueggPcpaActividadesPromocion
             .update({
              id_pcpa_construccion: req.body.id_pcpa_construccion ?? ueggPcpaActividadesPromocion.id_pcpa_construccion,
              id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo ?? ueggPcpaActividadesPromocion.id_pcpa_actividades_tipo,
            
              nivel: req.body.nivel ?? ueggPcpaActividadesPromocion.nivel,
              fec_aprobacion: req.body.fec_aprobacion ?? ueggPcpaActividadesPromocion.fec_aprobacion,
              tiempo_vigencia: req.body.tiempo_vigencia ?? ueggPcpaActividadesPromocion.tiempo_vigencia,
              declaracion_jurada: req.body.declaracion_jurada ?? ueggPcpaActividadesPromocion.declaracion_jurada,
// ^^^ Esta línea es especialmente importante si 'declaracion_jurada' puede ser 'false'
              estado: req.body.estado ?? ueggPcpaActividadesPromocion.estado,
              usu_mod: req.body.usu_cre ?? ueggPcpaActividadesPromocion.usu_mod, // Corregido: Añadido fallback
              fec_mod: new Date() 
             })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaActividadesPromocion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaActividadesPromocion.findByPk(req.params.Id)
          .then(ueggPcpaActividadesPromocion => {
            if (!ueggPcpaActividadesPromocion) {
              return res.status(400).send({
                message: "ueggPcpaActividadesPromocion Not Found"
              });
            }
            return ueggPcpaActividadesPromocion
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },


      deleteLogico(req, res) { // en el front se llama    
        console.log('id contruccion : req.params.id: ',req.params.id );
     
  
        return UeggPcpaActividadesPromocion.findByPk(req.params.id, {})
            .then(ueggPcpaActividadesPromocion => {
              if (!ueggPcpaActividadesPromocion) {
                return res.status(404).send({
                  message: "ueggPcpaActividadesPromocion Not Found"
                });
              }
              return ueggPcpaActividadesPromocion
                .update({
                 
                  estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod
                })
                .then(() =>{  
                   console.log(' *************SI INACTIVADO OK');
                   res.status(204).send(ueggPcpaActividadesPromocion)   })
                .catch(error => {
                  console.log(' *************ERROR INACTIVADO 1', error);
                  res.status(400).send(error)  });
            })
            .catch(error => {
              console.log(' *************ERROR INACTIVADO 2',  error);
              res.status(400).send(error)  });
      },   



};