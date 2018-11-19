'use strict'
const data = use('App/Utils/Data')

class EdeEtapaTareaController {

    //>20181116-fretamal-vectoritcgroup
    async getByEdeEtapaId({request, response}) {
        const cliente = request.input('cliente') ;
        var ede_etapa_id = request.input('ede_etapa_id');
        const query = `SELECT * FROM EdeEtapaTarea WHERE activo = 1 AND idEdeEtapa = '${ede_etapa_id}'`;
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

module.exports = EdeEtapaTareaController
