const { sequelize } = require('../models');
module.exports = 
{                                                                  
    /* async dashboardCounts(req, res) {
      try {
        res.status(200).json({
          mensaje: 'Ruta funcionando correctamente',
          ok: true
        });
      } catch (error) {
        res.status(500).json({ mensaje: 'Error en la ruta de prueba', error });
      }
    }, */
    /* async dashboardCounts(req, res) {
        try {
        // Consulta 1: construcciones activas con true/false
        const [construccion] = await sequelize.query(`
            SELECT 
            COUNT(*) FILTER (WHERE check_diagnostico_pcpa = true) AS total_true,
            COUNT(*) FILTER (WHERE check_diagnostico_pcpa = false) AS total_false
            FROM public.uegg_pcpa_construccion
            WHERE estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });

        // Consulta 2: actividades de promoción
        const [actividades] = await sequelize.query(`
            SELECT COUNT(*) AS actividades_promocion_total
            FROM public.uegg_pcpa_actividades_promocion
            WHERE estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });

        // Devuelve JSON combinado
        res.status(200).json({ ...construccion, ...actividades });
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    } */
    // Función optimizada para realizar ambas consultas en paralelo
    async dashboardCounts(req, res) {
        try {
        // pcp aprobados
        const [aprobados] = await sequelize.query(`
            SELECT COUNT(*) AS actividades_aprobados
            FROM public.uegg_pcpa_actividades_promocion
            WHERE estado = 'ACTIVO' and declaracion_jurada = true
        `, { type: sequelize.QueryTypes.SELECT });
        // socializados
        const [socializados] = await sequelize.query(`
            SELECT COUNT(*) AS socializados FROM public.uegg_pcpa_miembro_comision AS upmc WHERE id_pcpa_comision_tipo = 3 and upmc.estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });
        //PCPA desarrollo con diagnóstico previoS
        const [diagnóstico] = await sequelize.query(`
            SELECT COUNT(*) FILTER (WHERE check_diagnostico_pcpa = true) AS diagnóstico FROM public.uegg_pcpa_construccion WHERE estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });
        //Planes de seguimiento
        const [seguimiento] = await sequelize.query(`
            select COUNT(*) AS seguimiento from uegg_pcpa_actividades_ejecutadas upae join uegg_pcpa_construccion upc on upae.id_pcpa_construccion = upc.id where upc.estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });
        //Cumplimiento del 80%
        const [cumplimiento] = await sequelize.query(`
            select COUNT(*) AS cumplimiento from uegg_pcpa_actividades_ejecutadas upae join uegg_pcpa_construccion upc on upae.id_pcpa_construccion = upc.id where upc.estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });
        // Consulta 2: actividades de promoción
        const [actividades_promocion] = await sequelize.query(`
            SELECT COUNT(*) AS actividades_promocion_total
            FROM public.uegg_pcpa_actividades_promocion
            WHERE estado = 'ACTIVO'
        `, { type: sequelize.QueryTypes.SELECT });

        // Devuelve JSON combinado
        res.status(200).json({ ...aprobados, ...socializados, ...diagnóstico, ...seguimiento,  ...cumplimiento, ...actividades_promocion });
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }
};