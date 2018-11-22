'use strict'
const data = use('App/Utils/Data')

class EdeEtapaTareaAccionController {

    //>20181116-fretamal-vectoritcgroup
    async getByEdeEtapaTareaId({request, response}) {
        const cliente = request.input('cliente') ;
        var ede_etapa_tarea_id = request.input('ede_etapa_tarea_id');
        const query = `SELECT * FROM EdeEtapaTareaAccion WHERE activo = 1 AND idEdeEtapaTarea = '${ede_etapa_tarea_id}'`;
        try {
            const result = await data.execQuery(cliente, query);
            response.json({
                "estado": { "codigo": "0000", "mensaje": null },
                "data": result[0]
            });
        } catch (e) {
            response.json({
                "estado": { "codigo": "0001", "mensaje": e },
                "data": null
            });
        }
    }
    //<
}

module.exports = EdeEtapaTareaAccionController
