
'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
const response_builder = use('App/Utils/ResponseBuilderUtil')
class Encuesta {

    async addAplicacion({request,response}){
        var encuesta = request.input("encuesta")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_addAplicacionEncuesta('${encuesta.idEncuesta}','${encuesta.idEmpresaProceso}','${encuesta.desde}','${encuesta.hasta}')`;
        
        var result=null;
        try {
            const result_temp   = await data.execQuery(cliente,query);
            result = response_builder.success(result_temp, 'OK');
        } catch (e) {
            result = response_builder.technical_exception('Error al traer encuestas.', e);
        }

        response.json(result);
    }
}

module.exports = Encuesta
