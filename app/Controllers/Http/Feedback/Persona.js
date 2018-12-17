'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Persona {


    

    async list({request,response}){
       
        var idProceso=request.input('idProceso');
        var idPersona=request.input('idPersona');
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getByIdOpinante('${idProceso}','${idPersona}')`;
        
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
    async getFeedback({request,response}){
       
        var idOpinante=request.input('idOpinante');
        
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getById('${idOpinante}')`;
        
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
    async saveFeedback({request,response}){
       
        var idOpinante=request.input('idOpinante');
        var observacion=request.input('observacion');
        
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveFeedback('${idOpinante}','${observacion}')`;
        
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

module.exports=Persona