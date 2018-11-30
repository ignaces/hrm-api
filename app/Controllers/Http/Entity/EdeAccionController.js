'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeAccionController {

    //20181116 / fretamal / vectoritcgroup
    async getAll({request, response}) {
        console.log('api / Entity / EdeAccionController / getAll / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            const query = `SELECT * FROM EdeAccion WHERE activo = 1`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registran Acciones.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Acciones.', e);
        }
        //console.log('api / Entity / EdeAccionController / getAll / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = EdeAccionController;