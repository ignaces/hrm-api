'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
const response_builder = use('App/Utils/ResponseBuilderUtil')
class Encuesta {
    async getAll({request,response}){
        
        const cliente =request.input('cliente') ;
        
        const query = `call encuesta_getAll()`;
        var result=null;
        try {
            const result_temp   = await data.execQuery(cliente,query);
            result = response_builder.success(result_temp, 'OK');
        } catch (e) {
            result = response_builder.technical_exception('Error al traer encuestas.', e);
        }
        console.log(result)
        response.json(result);
    }
    
}

module.exports = Encuesta