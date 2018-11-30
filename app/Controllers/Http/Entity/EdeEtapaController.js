'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaController {

    //20181116 / fretamal / vectoritcgroup
    async getAll({request, response}) {
        console.log('api / Entity / EdeEtapaController / getAll / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            const query = `SELECT * FROM EdeEtapa WHERE activo = 1`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registran Etapas.');
        } catch (e) {
            result = response_builder.technical_exception('Error al obtener Etapas.', e);
        }
        //console.log('api / Entity / EdeEtapaController / getAll / result =' + JSON.stringify(result));
        return result;
    }

    //20181116 / fretamal / vectoritcgroup
    async getBy$EdeProceso({request, response}) {
        console.log('api / Entity / EdeEtapaController / getByEdeProceso / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var edeproceso_id = request.input('edeproceso_id');
            const query = `SELECT * FROM EdeEtapa WHERE activo = 1 AND idEdeProceso = '${edeproceso_id}'`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registran Etapas para Proceso.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Etapas por Proceso.', e);
        }
        //console.log('api / Entity / EdeEtapaController / getByEdeProceso / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = EdeEtapaController;