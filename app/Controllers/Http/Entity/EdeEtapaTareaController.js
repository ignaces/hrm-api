'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaTareaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$EdeEtapaId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaController / getBy$EdeEtapaId / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var ede_etapa_id = request.input('ede_etapa_id');
            //console.log('api / Entity / EdeEtapaTareaController / getBy$EdeEtapaId / params / ede_etapa_id =' + ede_etapa_id);
            const query = `SELECT * FROM EdeEtapaTarea WHERE activo = 1 AND idEdeEtapa = '${ede_etapa_id}'`;
            //console.log('api / Entity / EdeEtapaTareaController / getBy$EdeEtapaId / query =' + query);
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registra Tareas para Etapa.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Tareas para Etapa.', e);
        }
        //console.log('api / Entity / EdeEtapaTareaController / getBy$EdeEtapaId / result =' + JSON.stringify(result));
        console.log('api / Entity / EdeEtapaTareaController / getBy$EdeEtapaId / exit');
        return result;
    }
}

module.exports = EdeEtapaTareaController;