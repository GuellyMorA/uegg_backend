'use strict';
//autor: gma
//date :07/03/2024

module.exports = (sequelize, DataTypes) => {
  const UeggEmbEstudianteDerechosSeg = sequelize.define(
    'uegg_emb_estudiante_derechos_seg',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },

      // 🔹 Campos principales
      id_pcpa_unidad_educativa: DataTypes.INTEGER,
      id_emb_informe_embarazo: DataTypes.INTEGER,
      cod_rude: DataTypes.STRING,
      nombres_apellidos: DataTypes.STRING,

      // 🔹 Booleans
      check_emb_agresion_sexual: DataTypes.BOOLEAN,
      check_emb_reporte_dna: DataTypes.BOOLEAN,
      check_emb_sentencia_interrupcion: DataTypes.BOOLEAN,
      check_director_victima_violencia: DataTypes.BOOLEAN,
      check_emb_director_refiere_dna: DataTypes.BOOLEAN,

      // 🔹 Fechas
      fec_emb_referencia_dna: DataTypes.DATE,
      fec_denuncia: DataTypes.DATE,

      // 🔹 Datos de denuncia
      cod_caso_denuncia: DataTypes.STRING,
      nombre_denunciante: DataTypes.STRING,
      nombre_adolescente: DataTypes.STRING,
      motivo_denuncia: DataTypes.STRING,
      acciones_a_seguir: DataTypes.STRING,

      // 🔹 Auditoría
      estado: DataTypes.STRING,
      usu_cre: DataTypes.STRING,
      usu_mod: DataTypes.STRING,
      fec_cre: DataTypes.DATE,
      fec_mod: DataTypes.DATE
    },
    {
      tableName: 'uegg_emb_estudiante_derechos_seg',
      timestamps: false
    }
  );

  UeggEmbEstudianteDerechosSeg.associate = function (models) {
    // asociaciones si aplican
  };

  return UeggEmbEstudianteDerechosSeg;
};
