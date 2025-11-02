'use strict';
//const sequelize = UeggPcpaIndicadoresTipo.sequelize;
//autor: gma
//date :07/03/2024


module.exports = (sequelize, DataTypes) => {	
    const   UeggPcpaIndicadoresTipo = sequelize.define('uegg_pcpa_indicadores_tipo', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       cod_indicadores: DataTypes.STRING,
       desc_indicadores: DataTypes.STRING,	
       orden: DataTypes.INTEGER, 	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {         tableName: 'uegg_pcpa_indicadores_tipo',    	
     timestamps: false,     });  	
     UeggPcpaIndicadoresTipo.associate = function(models) {       	
    };     return UeggPcpaIndicadoresTipo; };	




   