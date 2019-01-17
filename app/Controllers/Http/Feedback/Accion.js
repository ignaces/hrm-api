'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
const dateformat = require('dateformat');
const mailgun = use('App/Utils/Mail') ;

class Accion {

    async predeterminadas({request,response}){
       
        var idCompetencia=request.input('idCompetencia');
       
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getAccionesPredeterminadas('${idCompetencia}')`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    


}

module.exports=Accion