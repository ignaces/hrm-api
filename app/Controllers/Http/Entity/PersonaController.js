'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class PersonaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$Identificador ({request, response}) {
        console.log('api / Entity / PersonaController / getByIdentificador / access');
        console.log('api / Entity / PersonaController / getByIdentificador / params / felipe =' + request.input('felipe'));
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var identificador = request.input('persona_identificador');
            console.log('api / Entity / PersonaController / getByIdentificador / params / persona_identificador =' + identificador);
            const query = `SELECT * FROM Persona WHERE identificador = '${identificador}'`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp, 'No se registra Persona para Identificador.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Persona por Identificador.', e);
        }
        //console.log('api / Entity / PersonaController / getByIdentificador / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = PersonaController;