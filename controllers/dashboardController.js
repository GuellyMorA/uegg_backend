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
    async dashboardCounts(req, res) {
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
    }
};