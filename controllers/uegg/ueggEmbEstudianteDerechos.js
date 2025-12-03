const UeggEmbEstudianteDerecho = require('../../models/uegg').uegg_emb_estudiante_derechos ; 
const sequelize = UeggEmbEstudianteDerecho.sequelize;


module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteDerecho
            .findAll({})
            .then((ueggEmbEstudianteDerecho) => res.status(200).send(ueggEmbEstudianteDerecho)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteDerecho
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteDerecho) => { 
                console.log(ueggEmbEstudianteDerecho);
                if (!ueggEmbEstudianteDerecho) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteDerecho no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteDerecho); 
            })
            .catch((error) => res.status(400).send(error));
    },

  getByCodRude(req, res) {  //  cod_ue=cod_sie
    console.log('req', req.params);
    return sequelize.query(`
    SELECT uembder.id as id_estudiante_derechos,upcon.id as id_pcpa_construccion  ,  uembder.id_pcpa_unidad_educativa,
      id_emb_informe_embarazo, cod_rude, nombres_apellidos, complemento, fec_nacimiento, tiempo_gestacion, numero_embarazos, check_recibe_control_prenatal, 
      check_requiere_permiso_para_control, check_requiere_cuidado_especial, check_cuenta_con_medidas_ue, fec_estimada_parto, fec_ini_baja_prenatal, 
      fec_fin_baja_postnatal,  fec_retorno_a_ue, numero_dias_baja_medica, check_embarazo_nacido_vivo, numero_edad_progenitor, check_progenitor_estudiante_ue, 
      check_tutores_al_tanto_emb,  numero_dias_permiso_control, persona_asignada_seguimiento, check_cuenta_con_seguimiento,  
        uembder.estado
      from uegg_pcpa_construccion upcon                 
      join uegg_pcpa_unidad_educativa upue         on   upcon.id_pcpa_unidad_educativa = upue.id  
      join uegg_emb_estudiante_derechos uembder    on uembder.id_pcpa_unidad_educativa = upue.id      
    WHERE uembder.cod_rude =  '${req.params.id}'  and upcon.estado in ('ACTIVO','MODIFICADO') and upue.estado in ('ACTIVO','MODIFICADO')  and uembder.estado in ('ACTIVO','MODIFICADO') 
 
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

    // 🛠️ HELPERS DE SANITIZACIÓN LOCALES
    // Convierte vacíos a 0 (Para campos INTEGER NOT NULL)
    const toInt = (val) => (val === "" || val === null || val === undefined) ? 0 : parseInt(val);
    
    // Convierte vacíos a NULL (Para Fechas, IDs o Strings opcionales)
    const toNull = (val) => (val === "" || val === null || val === undefined) ? null : val;

    // Convierte a Booleano seguro (evita strings raros)
    const toBool = (val) => (val === 'true' || val === true || val === 1 || val === '1');

    return UeggEmbEstudianteDerecho.create({

      // 📌 Campos principales (IDs suelen ser opcionales o null si no existen)
      id_pcpa_unidad_educativa: toNull(req.body.id_pcpa_unidad_educativa),
      id_emb_informe_embarazo: toNull(req.body.id_emb_informe_embarazo),

      cod_rude: toNull(req.body.cod_rude),
      nombres_apellidos: toNull(req.body.nombres_apellidos),
      complemento: toNull(req.body.complemento),
      fec_nacimiento: toNull(req.body.fec_nacimiento),

      // 📌 Campos NUMÉRICOS (Aquí estaba tu error principal)
      // Usamos toInt para asegurar que si llega "" se guarde un 0
      tiempo_gestacion: toInt(req.body.tiempo_gestacion),
      numero_embarazos: toInt(req.body.numero_embarazos),

      // 📌 Booleanos
      check_recibe_control_prenatal: toBool(req.body.check_recibe_control_prenatal),
      check_requiere_permiso_para_control: toBool(req.body.check_requiere_permiso_para_control),
      check_requiere_cuidado_especial: toBool(req.body.check_requiere_cuidado_especial),
      check_cuenta_con_medidas_ue: toBool(req.body.check_cuenta_con_medidas_ue),

      // 📌 Fechas (Postgres da error si mandas "" a una fecha, debe ser null)
      fec_estimada_parto: toNull(req.body.fec_estimada_parto),
      fec_ini_baja_prenatal: toNull(req.body.fec_ini_baja_prenatal),
      fec_fin_baja_postnatal: toNull(req.body.fec_fin_baja_postnatal),
      fec_retorno_a_ue: toNull(req.body.fec_retorno_a_ue),

      // 📌 Más Campos NUMÉRICOS
      numero_dias_baja_medica: toInt(req.body.numero_dias_baja_medica),
      check_embarazo_nacido_vivo: toBool(req.body.check_embarazo_nacido_vivo),
      numero_edad_progenitor: toInt(req.body.numero_edad_progenitor),
      check_progenitor_estudiante_ue: toBool(req.body.check_progenitor_estudiante_ue),
      check_tutores_al_tanto_emb: toBool(req.body.check_tutores_al_tanto_emb),
      numero_dias_permiso_control: toInt(req.body.numero_dias_permiso_control),

      // 📌 Seguimiento
      persona_asignada_seguimiento: toNull(req.body.persona_asignada_seguimiento),
      check_cuenta_con_seguimiento: toBool(req.body.check_cuenta_con_seguimiento),

      // 📌 Auditoría
      estado: "ACTIVO",
      usu_cre: toInt(req.body.usu_cre), // Asumo que el ID de usuario es numérico
      usu_mod: null,
      fec_cre: req.body.fec_cre ?? new Date().toISOString().slice(0, 10),
      fec_mod: null

    })
      .then(row => res.status(201).send(row))
      .catch(error => {
        console.log("❌ ERROR INSERT:", error);
        // Tip: Devuelve el mensaje de error para que el frontend sepa qué pasó
        res.status(400).send({
          message: "Error al guardar datos",
          detail: error.parent ? error.parent.detail : error.message
        });
      });
  },

update(req, res) {
    console.log('req params: ', req.params);

    // 🛠️ HELPERS DE SANITIZACIÓN (Igual que en el Add)
    const toInt = (val) => (val === "" || val === null) ? 0 : parseInt(val);
    const toNull = (val) => (val === "" || val === null) ? null : val;
    const toBool = (val) => (val === 'true' || val === true || val === 1 || val === '1');

    return UeggEmbEstudianteDerecho.findByPk(req.params.id)
      .then(ueggEmbEstudianteDerecho => {

        if (!ueggEmbEstudianteDerecho) {
          return res.status(404).send({ message: "Registro no encontrado" });
        }

        // 💡 LÓGICA DE ACTUALIZACIÓN INTELIGENTE:
        // Verificamos si la propiedad existe en req.body (req.body.prop !== undefined).
        // - Si existe: Sanitizamos el valor nuevo.
        // - Si NO existe: Mantenemos el valor actual de la base de datos (ueggEmbEstudianteDerecho.prop).

        return ueggEmbEstudianteDerecho.update({

          // 📌 Datos principales (Pueden ser Null)
          id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa !== undefined ? toNull(req.body.id_pcpa_unidad_educativa) : ueggEmbEstudianteDerecho.id_pcpa_unidad_educativa,
          id_emb_informe_embarazo: req.body.id_emb_informe_embarazo !== undefined ? toNull(req.body.id_emb_informe_embarazo) : ueggEmbEstudianteDerecho.id_emb_informe_embarazo,

          cod_rude: req.body.cod_rude !== undefined ? toNull(req.body.cod_rude) : ueggEmbEstudianteDerecho.cod_rude,
          nombres_apellidos: req.body.nombres_apellidos !== undefined ? toNull(req.body.nombres_apellidos) : ueggEmbEstudianteDerecho.nombres_apellidos,
          complemento: req.body.complemento !== undefined ? toNull(req.body.complemento) : ueggEmbEstudianteDerecho.complemento,
          fec_nacimiento: req.body.fec_nacimiento !== undefined ? toNull(req.body.fec_nacimiento) : ueggEmbEstudianteDerecho.fec_nacimiento,

          // 📌 NOT NULL (Numéricos) - Si mandan "", se convierte a 0
          tiempo_gestacion: req.body.tiempo_gestacion !== undefined ? toInt(req.body.tiempo_gestacion) : ueggEmbEstudianteDerecho.tiempo_gestacion,
          numero_embarazos: req.body.numero_embarazos !== undefined ? toInt(req.body.numero_embarazos) : ueggEmbEstudianteDerecho.numero_embarazos,

          // 📌 Booleans
          check_recibe_control_prenatal: req.body.check_recibe_control_prenatal !== undefined ? toBool(req.body.check_recibe_control_prenatal) : ueggEmbEstudianteDerecho.check_recibe_control_prenatal,
          check_requiere_permiso_para_control: req.body.check_requiere_permiso_para_control !== undefined ? toBool(req.body.check_requiere_permiso_para_control) : ueggEmbEstudianteDerecho.check_requiere_permiso_para_control,
          check_requiere_cuidado_especial: req.body.check_requiere_cuidado_especial !== undefined ? toBool(req.body.check_requiere_cuidado_especial) : ueggEmbEstudianteDerecho.check_requiere_cuidado_especial,
          check_cuenta_con_medidas_ue: req.body.check_cuenta_con_medidas_ue !== undefined ? toBool(req.body.check_cuenta_con_medidas_ue) : ueggEmbEstudianteDerecho.check_cuenta_con_medidas_ue,

          // 📌 Fechas (Crucial: si mandan "", convertir a NULL)
          fec_estimada_parto: req.body.fec_estimada_parto !== undefined ? toNull(req.body.fec_estimada_parto) : ueggEmbEstudianteDerecho.fec_estimada_parto,
          fec_ini_baja_prenatal: req.body.fec_ini_baja_prenatal !== undefined ? toNull(req.body.fec_ini_baja_prenatal) : ueggEmbEstudianteDerecho.fec_ini_baja_prenatal,
          fec_fin_baja_postnatal: req.body.fec_fin_baja_postnatal !== undefined ? toNull(req.body.fec_fin_baja_postnatal) : ueggEmbEstudianteDerecho.fec_fin_baja_postnatal,
          fec_retorno_a_ue: req.body.fec_retorno_a_ue !== undefined ? toNull(req.body.fec_retorno_a_ue) : ueggEmbEstudianteDerecho.fec_retorno_a_ue,

          // 📌 Más NOT NULL (Numéricos y Booleans)
          numero_dias_baja_medica: req.body.numero_dias_baja_medica !== undefined ? toInt(req.body.numero_dias_baja_medica) : ueggEmbEstudianteDerecho.numero_dias_baja_medica,
          check_embarazo_nacido_vivo: req.body.check_embarazo_nacido_vivo !== undefined ? toBool(req.body.check_embarazo_nacido_vivo) : ueggEmbEstudianteDerecho.check_embarazo_nacido_vivo,
          numero_edad_progenitor: req.body.numero_edad_progenitor !== undefined ? toInt(req.body.numero_edad_progenitor) : ueggEmbEstudianteDerecho.numero_edad_progenitor,
          check_progenitor_estudiante_ue: req.body.check_progenitor_estudiante_ue !== undefined ? toBool(req.body.check_progenitor_estudiante_ue) : ueggEmbEstudianteDerecho.check_progenitor_estudiante_ue,
          check_tutores_al_tanto_emb: req.body.check_tutores_al_tanto_emb !== undefined ? toBool(req.body.check_tutores_al_tanto_emb) : ueggEmbEstudianteDerecho.check_tutores_al_tanto_emb,
          numero_dias_permiso_control: req.body.numero_dias_permiso_control !== undefined ? toInt(req.body.numero_dias_permiso_control) : ueggEmbEstudianteDerecho.numero_dias_permiso_control,

          // 📌 Seguimiento
          persona_asignada_seguimiento: req.body.persona_asignada_seguimiento !== undefined ? toNull(req.body.persona_asignada_seguimiento) : ueggEmbEstudianteDerecho.persona_asignada_seguimiento,
          check_cuenta_con_seguimiento: req.body.check_cuenta_con_seguimiento !== undefined ? toBool(req.body.check_cuenta_con_seguimiento) : ueggEmbEstudianteDerecho.check_cuenta_con_seguimiento,

          // 📌 Auditoría
          estado: req.body.estado ?? "MODIFICADO", // Opcional, por si quieres permitir cambiar estado
          usu_mod: req.body.usu_mod !== undefined ? toInt(req.body.usu_mod) : ueggEmbEstudianteDerecho.usu_mod,
          fec_mod: new Date().toISOString().slice(0, 10) // Siempre actualizamos la fecha de modificación

        })
          .then((updatedRecord) => {
            console.log("✔ UPDATE OK");
            res.status(200).send(updatedRecord);
          })
          .catch(error => {
            console.log("❌ ERROR UPDATE (Sequelize):", error);
            res.status(400).send({
               message: "Error al actualizar",
               detail: error.parent ? error.parent.detail : error.message 
            });
          });

      })
      .catch(error => {
        console.log("❌ ERROR UPDATE (Find):", error);
        res.status(500).send(error);
      });
  },
   
    
  delete(req, res) {
        return UeggEmbEstudianteDerecho.findByPk(req.params.id)
          .then(ueggEmbEstudianteDerecho => {
            if (!ueggEmbEstudianteDerecho) {
              return res.status(400).send({
                message: "ueggEmbEstudianteDerecho Not Found"
              });
            }
            return ueggEmbEstudianteDerecho
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }


};