'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class PersonaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$ThisIdentificador ({request, response}) {
        console.log('api / Entity / PersonaController / getBy$ThisIdentificador / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            var identificador = request.input('persona_identificador');
            //console.log('api / Entity / PersonaController / getBy$ThisIdentificador / params / persona_identificador =' + identificador);
            //const query = `SELECT * FROM Persona WHERE identificador = '${identificador}'`;
            const query = `call pers_getPersonaByIdentificador('${identificador}')`;
            const result_temp = await data.execQuery(cliente, query);
            result = response_builder.success(result_temp[0], 'No se registra Persona para Identificador.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Persona por Identificador.', e);
        }
        //console.log('api / Entity / PersonaController / getBy$ThisIdentificador / result =' + JSON.stringify(result));
        console.log('api / Entity / PersonaController / getBy$ThisIdentificador / exit');
        return result;
    }
}

module.exports = PersonaController;