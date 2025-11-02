'use strict';
//autor: gma
//date :07/03/2024



module.exports = (sequelize, DataTypes) => {  	
    const   UeggPcpaAccionesEjecucion = sequelize.define('uegg_pcpa_accciones_ejecucion', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },

       id_pcpa_construccion: DataTypes.INTEGER,	
       cantidad_acciones_inicial: DataTypes.INTEGER,	
       cantidad_acciones_final: DataTypes.INTEGER,	

       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {        	
     tableName: 'uegg_pcpa_accciones_ejecucion',     	
     timestamps: false,   	
     });    	
     UeggPcpaAccionesEjecucion.associate = function(models) {      	
        };    	
        return UeggPcpaAccionesEjecucion; };
       
       
       



   