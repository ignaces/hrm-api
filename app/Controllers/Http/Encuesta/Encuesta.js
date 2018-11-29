'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');

class Encuesta {
    async getAll({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call encuesta_getAll('${idEncuestaAplicacion}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
    }
}

module.exports = Encuesta