'use strict';
//const sequelize = UeggPcpaIndicadoresEjecucion.sequelize;
//autor: gma
//date :07/03/2024


module.exports = (sequelize, DataTypes) => { 	
  const UeggPcpaIndicadoresEjecucion = sequelize.define(
    'uegg_pcpa_indicadores_ejecucion', // ← nombre del modelo (por convención en PascalCase)
    {	
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      id_pcpa_construccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_pcpa_construccion'
      },
      id_pcpa_indicadores_tipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_pcpa_indicadores_tipo'
      },
      cod_indicadores: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'cod_indicadores'
      },
      desc_indicadores: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'desc_indicadores'
      },
      fec_ejecucion: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fec_ejecucion'
      },
      estado: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'estado'
      },
      usu_cre: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'usu_cre'
      },
      usu_mod: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'usu_mod'
      },
      fec_cre: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fec_cre'
      },
      fec_mod: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fec_mod'
      }       
    }, 
    {    	
      tableName: 'uegg_pcpa_indicadores_ejecucion',       	
      timestamps: false,
      underscored: true // opcional: fuerza nombres con guiones bajos si usas convenciones
    }
  );     	

  // Relaciones (se definen aquí si hay claves foráneas)
  UeggPcpaIndicadoresEjecucion.associate = function(models) {
    // Ejemplo: 
    // UeggPcpaIndicadoresEjecucion.belongsTo(models.UeggPcpaConstruccion, {
    //   foreignKey: 'id_pcpa_construccion',
    //   as: 'construccion'
    // });
  };   	

  return UeggPcpaIndicadoresEjecucion; 
};

       




   