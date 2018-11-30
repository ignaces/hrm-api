'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaTareaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$EdeEtapaId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaController / getByEdeEtapaId / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var ede_etapa_id = request.input('ede_etapa_id');
            const query = `SELECT * FROM EdeEtapaTarea WHERE activo = 1 AND idEdeEtapa = '${ede_etapa_id}'`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registra Tareas para Etapa.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Tareas para Etapa.', e);
        }
        //console.log('api / Entity / EdeEtapaTareaController / getByEdeEtapaId / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = EdeEtapaTareaController;