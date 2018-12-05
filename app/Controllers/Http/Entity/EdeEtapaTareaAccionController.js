'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaTareaAccionController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$EdeEtapaTareaId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaAccionController / getBy$EdeEtapaTareaId / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var ede_etapa_tarea_id = request.input('ede_etapa_tarea_id');
            console.log('api / Entity / EdeEtapaTareaAccionController / getBy$EdeEtapaTareaId / params / ede_etapa_tarea_id =' + ede_etapa_tarea_id);
            const query = `SELECT * FROM EdeEtapaTareaAccion WHERE activo = 1 AND idEdeEtapaTarea = '${ede_etapa_tarea_id}'`;
            console.log('api / Entity / EdeEtapaTareaAccionController / getBy$EdeEtapaTareaId / query =' + query);
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registran Acciones para Tarea.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Acciones para Tarea.', e);
        }
        //console.log('api / Entity / EdeEtapaTareaAccionController / getBy$EdeEtapaTareaId / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = EdeEtapaTareaAccionController;
