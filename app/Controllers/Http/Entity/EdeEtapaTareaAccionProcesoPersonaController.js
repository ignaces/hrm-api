'use strict'
const data = use('App/Utils/Data')

class EdeEtapaTareaAccionProcesoPersonaController {

    //>20181116-fretamal-vectoritcgroup
    async getByEdeEtapaTareaId({request, response}) {
        console.log('access app =[api] class =[EdeEtapaTareaAccionProcesoPersonaController] method =[create]');

        var obj = request.input('obj');
        const cliente = request.input('cliente') ;

        console.log(JSON.stringify(obj));

        //const query = `SELECT * FROM EdeEtapaTareaAccion WHERE activo = 1 AND idEdeEtapaTarea = '${ede_etapa_tarea_id}'`;
        try {
            //const result = await data.execQuery(cliente, obj);
            response.json({
                "estado": { "codigo": "0000", "mensaje": null },
                "data": null
            });
        } catch (e) {
            response.json({
                "estado": { "codigo": "0001", "mensaje": e },
                "data": null
            });
        }
        console.log('exit app =[api] class =[EdeEtapaTareaAccionProcesoPersonaController] method =[create]');
    }
    //<
}

module.exports = EdeEtapaTareaAccionProcesoPersonaController
