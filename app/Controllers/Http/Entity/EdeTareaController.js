'use strict'
const data = use('App/Utils/Data')

class EdeTareaController {

    //>20181116-fretamal-vectoritcgroup
    async getAll({request, response}) {
        const cliente = request.input('cliente') ;
        const query = `SELECT * FROM EdeTarea WHERE activo = 1`;
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

module.exports = EdeTareaController