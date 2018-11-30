'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');

//20181116 / fretamal / vectoritcgroup
class EdeProcesoPersonaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$PersonaId$EdeProcesoId({request, response}) {
        console.log('api / Entity / EdeProcesoPersonaController / getByPersonaIdEdeProcesoId / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            const ede_proceso_id = request.input('ede_proceso_id') ;
            const persona_id = request.input('persona_id') ;

            var query = [];
            query.push("SELECT * ");
            query.push("FROM EdeProcesoPersona ");
            query.push("WHERE activo = 1 ");
            query.push("AND idEdeProceso = '" + ede_proceso_id + "' ");
            query.push("AND idPersona = '" + persona_id + "' ");

            const result_temp = await data.execQuery(cliente, query.join(""));
            result = response_builder.success(result_temp, 'No se registra Persona en Proceso.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Persona en Proceso.', e);
        }
        //console.log('api / Entity / EdeProcesoPersonaController / getByPersonaIdEdeProcesoId / result =' + JSON.stringify(result));
        return result;
    }
}

module.exports = EdeProcesoPersonaController;