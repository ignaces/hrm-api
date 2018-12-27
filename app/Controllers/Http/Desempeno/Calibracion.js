'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Calibracion {


    // --->> OBSERVACION ACCION

    async updateCalibracion({request,response}){
       
        var idPersona=request.input('idPersona');
        
        const cliente =request.input('cliente') ;
        const query =  `call ede_updateCalibracion('${idPersona}')`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": [{}]
        });
    }


}

module.exports=Calibracion