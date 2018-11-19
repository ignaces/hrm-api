'use strict'
const data = use('App/Utils/Data')

class EdeEtapaController {

    //>20181116-fretamal-vectoritcgroup
    async getAll({request, response}) {
        const cliente = request.input('cliente') ;
        const query = `SELECT * FROM EdeEtapa WHERE activo = 1`;
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

    //>20181116-fretamal-vectoritcgroup
    async getByEdeProceso({request, response}) {
        const cliente = request.input('cliente') ;

        var edeproceso_id = request.input('edeproceso_id');

        const query = `SELECT * FROM EdeEtapa WHERE activo = 1 AND idEdeProceso = '${edeproceso_id}'`;
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

module.exports = EdeEtapaController
