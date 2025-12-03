const UeggEmbEstudianteDerechoSeg = require('../../models/uegg').uegg_emb_estudiante_derechos_seg ; 
const sequelize = UeggEmbEstudianteDerechoSeg.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteDerechoSeg
            .findAll({})
            .then((ueggEmbEstudianteDerechoSeg) => res.status(200).send(ueggEmbEstudianteDerechoSeg)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteDerechoSeg
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteDerechoSeg) => { 
                console.log(ueggEmbEstudianteDerechoSeg);
                if (!ueggEmbEstudianteDerechoSeg) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteDerechoSeg no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteDerechoSeg); 
            })
            .catch((error) => res.status(400).send(error));
    },

    getByCodRude(req, res) {  //  cod_ue=cod_sie
    console.log('req', req.params);
    return sequelize.query(`
      SELECT uembderSeg.id as id_estudiante_derechos_seg,upcon.id as id_pcpa_construccion  ,  uembderSeg.id_pcpa_unidad_educativa,
        id_emb_informe_embarazo, cod_rude, nombres_apellidos, complemento, fec_nacimiento, tiempo_gestacion, numero_embarazos, check_recibe_control_prenatal, 
        check_requiere_permiso_para_control, check_requiere_cuidado_especial, check_cuenta_con_medidas_ue, fec_estimada_parto, fec_ini_baja_prenatal, 
        fec_fin_baja_postnatal,  fec_retorno_a_ue, numero_dias_baja_medica, check_embarazo_nacido_vivo, numero_edad_progenitor, check_progenitor_estudiante_ue, 
        check_tutores_al_tanto_emb,  numero_dias_permiso_control, persona_asignada_seguimiento, check_cuenta_con_seguimiento,  
          uembderSeg.estado
        from uegg_pcpa_construccion upcon                 
        join uegg_pcpa_unidad_educativa upue         on   upcon.id_pcpa_unidad_educativa = upue.id  
        join uegg_emb_estudiante_derechos uembderSeg    on uembderSeg.id_pcpa_unidad_educativa = upue.id      
      WHERE uembderSeg.cod_rude =  '${req.params.id}'  and upcon.estado in ('ACTIVO','MODIFICADO') and upue.estado in ('ACTIVO','MODIFICADO')  and uembderSeg.estado in ('ACTIVO','MODIFICADO')          
         
      `,               
        {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
        })
          .then((result) => {
            console.log('✅ Resultado de getByCodRude:', result);
            res.status(200).send(result);
          })
          .catch((error) => {
            console.error('❌ Error en getByCodRude:', error);
            res.status(400).send(error);
          });
    },  

  add(req, res) {
   console.log('req: ', req.params);
  return UeggEmbEstudianteDerechoSeg.create({

    // 🔹 Campos principales
    id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa ?? null,
    id_emb_informe_embarazo: req.body.id_emb_informe_embarazo ?? null,

    cod_rude: req.body.cod_rude ?? null,
    nombres_apellidos: req.body.nombres_apellidos ?? null,

    // 🔹 Booleans de la tabla real
    check_emb_agresion_sexual: req.body.check_emb_agresion_sexual ?? false,
    check_emb_reporte_dna: req.body.check_emb_reporte_dna ?? false,
    check_emb_sentencia_interrupcion: req.body.check_emb_sentencia_interrupcion ?? false,
    check_director_victima_violencia: req.body.check_director_victima_violencia ?? false,
    check_emb_director_refiere_dna: req.body.check_emb_director_refiere_dna ?? false,

    // 🔹 Fechas reales del SQL
    fec_emb_referencia_dna: req.body.fec_emb_referencia_dna ?? null,
    fec_denuncia: req.body.fec_denuncia ?? null,

    // 🔹 Datos de denuncia
    cod_caso_denuncia: req.body.cod_caso_denuncia ?? null,
    nombre_denunciante: req.body.nombre_denunciante ?? null,
    nombre_adolescente: req.body.nombre_adolescente ?? null,
    motivo_denuncia: req.body.motivo_denuncia ?? null,
    acciones_a_seguir: req.body.acciones_a_seguir ?? null,

    // 🔹 Auditoría
    estado: "ACTIVO",
    usu_cre: req.body.usu_cre ?? null,
    fec_cre: req.body.fec_cre ?? new Date().toISOString(),
    usu_mod: null,
    fec_mod: null

  })
    .then(row => res.status(201).send(row))
    .catch(error => {
      console.log("❌ ERROR INSERT:", error);
      res.status(400).send(error);
    });
  },

  update(req, res) {
  console.log('req: ', req.params);
  return UeggEmbEstudianteDerechoSeg.findByPk(req.params.id)
    .then(row => {

      if (!row) {
        return res.status(404).send({ message: "ueggEmbEstudianteDerechoSeg Not Found" });
      }

      return row.update({

        // 🔹 Principales
        id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa ?? row.id_pcpa_unidad_educativa,
        id_emb_informe_embarazo: req.body.id_emb_informe_embarazo ?? row.id_emb_informe_embarazo,

        cod_rude: req.body.cod_rude ?? row.cod_rude,
        nombres_apellidos: req.body.nombres_apellidos ?? row.nombres_apellidos,

        // 🔹 Booleans reales
        check_emb_agresion_sexual: req.body.check_emb_agresion_sexual ?? row.check_emb_agresion_sexual,
        check_emb_reporte_dna: req.body.check_emb_reporte_dna ?? row.check_emb_reporte_dna,
        check_emb_sentencia_interrupcion: req.body.check_emb_sentencia_interrupcion ?? row.check_emb_sentencia_interrupcion,
        check_director_victima_violencia: req.body.check_director_victima_violencia ?? row.check_director_victima_violencia,
        check_emb_director_refiere_dna: req.body.check_emb_director_refiere_dna ?? row.check_emb_director_refiere_dna,

        // 🔹 Fechas
        fec_emb_referencia_dna: req.body.fec_emb_referencia_dna ?? row.fec_emb_referencia_dna,
        fec_denuncia: req.body.fec_denuncia ?? row.fec_denuncia,

        // 🔹 Denuncia
        cod_caso_denuncia: req.body.cod_caso_denuncia ?? row.cod_caso_denuncia,
        nombre_denunciante: req.body.nombre_denunciante ?? row.nombre_denunciante,
        nombre_adolescente: req.body.nombre_adolescente ?? row.nombre_adolescente,
        motivo_denuncia: req.body.motivo_denuncia ?? row.motivo_denuncia,
        acciones_a_seguir: req.body.acciones_a_seguir ?? row.acciones_a_seguir,

        // 🔹 Auditoría
        estado: "MODIFICADO",
        usu_mod: req.body.usu_mod ?? row.usu_mod,
        fec_mod: req.body.fec_mod ?? new Date().toISOString()

      })
      .then(() => {
        console.log("✔ UPDATE OK");
        res.status(200).send(row);
      })
      .catch(error => {
        console.log("❌ ERROR UPDATE 1", error);
        res.status(400).send(error);
      });

    })
    .catch(error => {
      console.log("❌ ERROR UPDATE 2", error);
      res.status(400).send(error);
    });
},


  delete(req, res) {
        return UeggEmbEstudianteDerechoSeg.findByPk(req.params.Id)
          .then(ueggEmbEstudianteDerechoSeg => {
            if (!ueggEmbEstudianteDerechoSeg) {
              return res.status(400).send({
                message: "ueggEmbEstudianteDerechoSeg Not Found"
              });
            }
            return ueggEmbEstudianteDerechoSeg
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
}

};