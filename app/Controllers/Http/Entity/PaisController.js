'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class PaisController {

    //20181116 / fretamal / vectoritcgroup
    async getAll({request, response}) {
        console.log('api / Entity / PaisController / getAll / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            const query = `SELECT * FROM Pais`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registran Paises.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Paises.', e);
        }
        //console.log('api / Entity / PaisController / getAll / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = PaisController;