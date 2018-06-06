'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');

class Periodo {

    async list({request,response}){
        var idEngagementProceso = request.input("idEngagementProceso")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getPeriodos()`;
        const result   = await data.execQuery(cliente,query);

        response.json(result[0][0]);
    }
}

module.exports = Periodo
