'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Documentos {

    // --->> TRAER DOCUMENTOS

    async getDocumentos({request,response}){
       
        var activo=request.input('activo');
        const cliente =request.input('cliente') ;
        const query =  `call getDocumentos('${activo}')`;
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

module.exports=Documentos