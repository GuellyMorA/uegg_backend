'use strict';

module.exports = (sequelize, DataTypes) => {

  const UeggEmbEstudianteDerechos = sequelize.define(
    'uegg_emb_estudiante_derechos',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },

      id_pcpa_unidad_educativa: {
        type: DataTypes.INTEGER,
        field: 'id_pcpa_unidad_educativa'
      },

      id_emb_informe_embarazo: {
        type: DataTypes.INTEGER,
        field: 'id_emb_informe_embarazo'
      },

      cod_rude: {
        type: DataTypes.STRING,
        field: 'cod_rude'
      },

      nombres_apellidos: {
        type: DataTypes.STRING,
        field: 'nombres_apellidos'
      },

      complemento: {
        type: DataTypes.STRING,
        field: 'complemento'
      },

      fec_nacimiento: {
        type: DataTypes.DATE,
        field: 'fec_nacimiento'
      },

      tiempo_gestacion: {
        type: DataTypes.INTEGER,
        field: 'tiempo_gestacion'
      },

      numero_embarazos: {
        type: DataTypes.INTEGER,
        field: 'numero_embarazos'
      },

      // ----------------------------------------------
      // NUEVOS CAMPOS (booleanos y fechas)
      // ----------------------------------------------

      check_recibe_control_prenatal: {
        type: DataTypes.BOOLEAN,
        field: 'check_recibe_control_prenatal'
      },

      check_requiere_permiso_para_control: {
        type: DataTypes.BOOLEAN,
        field: 'check_requiere_permiso_para_control'
      },

      check_requiere_cuidado_especial: {
        type: DataTypes.BOOLEAN,
        field: 'check_requiere_cuidado_especial'
      },

      check_cuenta_con_medidas_ue: {
        type: DataTypes.BOOLEAN,
        field: 'check_cuenta_con_medidas_ue'
      },

      fec_estimada_parto: {
        type: DataTypes.DATE,
        field: 'fec_estimada_parto'
      },

      fec_ini_baja_prenatal: {
        type: DataTypes.DATE,
        field: 'fec_ini_baja_prenatal'
      },

      fec_fin_baja_postnatal: {
        type: DataTypes.DATE,
        field: 'fec_fin_baja_postnatal'
      },

      fec_retorno_a_ue: {
        type: DataTypes.DATE,
        field: 'fec_retorno_a_ue'
      },

      // ----------------------------------------------
      // NUEVOS CAMPOS ADICIONALES
      // ----------------------------------------------

      numero_dias_baja_medica: {
        type: DataTypes.INTEGER,
        field: 'numero_dias_baja_medica'
      },

      check_embarazo_nacido_vivo: {
        type: DataTypes.BOOLEAN,
        field: 'check_embarazo_nacido_vivo'
      },

      numero_edad_progenitor: {
        type: DataTypes.INTEGER,
        field: 'numero_edad_progenitor'
      },

      check_progenitor_estudiante_ue: {
        type: DataTypes.BOOLEAN,
        field: 'check_progenitor_estudiante_ue'
      },

      check_tutores_al_tanto_emb: {
        type: DataTypes.BOOLEAN,
        field: 'check_tutores_al_tanto_emb'
      },

      numero_dias_permiso_control: {
        type: DataTypes.INTEGER,
        field: 'numero_dias_permiso_control'
      },

      // ----------------------------------------------
      // Seguimiento
      // ----------------------------------------------

      persona_asignada_seguimiento: {
        type: DataTypes.STRING,
        field: 'persona_asignada_seguimiento'
      },

      check_cuenta_con_seguimiento: {
        type: DataTypes.BOOLEAN,
        field: 'check_cuenta_con_seguimiento'
      },

      // ----------------------------------------------
      // Auditoría
      // ----------------------------------------------

      estado: {
        type: DataTypes.STRING,
        field: 'estado'
      },

      usu_cre: {
        type: DataTypes.STRING,
        field: 'usu_cre'
      },

      usu_mod: {
        type: DataTypes.STRING,
        field: 'usu_mod'
      },

      fec_cre: {
        type: DataTypes.DATE,
        field: 'fec_cre'
      },

      fec_mod: {
        type: DataTypes.DATE,
        field: 'fec_mod'
      }
    },
    {
      tableName: 'uegg_emb_estudiante_derechos',
      timestamps: false
    }
  );

  UeggEmbEstudianteDerechos.associate = function (models) {
    // asociaciones si aplican
  };

  return UeggEmbEstudianteDerechos;
};
