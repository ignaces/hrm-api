'use strict'
const data = use('App/Utils/Data')
const response_builder = use('App/Utils/ResponseBuilderUtil')

class EdeProcesoPersonaController {

    //>20181116-fretamal-vectoritcgroup
    async get({request, response}) {
        const cliente = request.input('cliente') ;

        const ede_proceso_id = request.input('ede_proceso_id') ;
        const persona_id = request.input('persona_id') ;

        var query = [];
        query.push("SELECT * ");
        query.push("FROM EdeProcesoPersona ");
        query.push("WHERE activo = 1 ");
        query.push("AND idEdeProceso = '" + ede_proceso_id + "' ");
        query.push("AND idPersona = '" + persona_id + "' ");

        console.log('********** EdeProcesoPersonaController > get > query =[' + query.join("") + ']');

        var result = null;

        try {
            const result_temp = await data.execQuery(cliente, query.join(""));
            result = response_builder.success(result_temp, 'Persona no existe en Proceso.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar Persona en Proceso.', e);
        }
        console.log('********** EdeProcesoPersonaController > get > result =[' + JSON.stringify(result) + ']');
        response.json(result);
    }
    //<
}

module.exports = EdeProcesoPersonaController