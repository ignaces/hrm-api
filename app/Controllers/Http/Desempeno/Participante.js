'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Participante {

    // --->> BUSCAR PARTICIPANTE

    async getParticipantes({request,response}){
       
        var idEde=request.input('idEde');
        var identificador=request.input('identificador');
        var appat=request.input('appat');
        var idPersona=request.input('idPersona');
        const cliente =request.input('cliente') ;
        const query =  `call ede_getParticipantes('${idEde}','${identificador}','${appat}','${idPersona}')`;
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

    // ---<< BUSCAR PARTICIPANTE




}

module.exports=Participante