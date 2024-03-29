'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Reporte {


    // --->> OBSERVACION ACCION

    async getIdentificador({request,response}){
        //console.log("FDSFSD");
        var idProcesoPersona=request.input('idProcesoPersona');
        
        const cliente =request.input('cliente') ;
        const query =  `call ede_getIdentificadorPorProcesoPersona('${idProcesoPersona}')`;
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

    async getResultadoPorOpinante({request,response}){
        const cliente = request.input('cliente');
        const idProceso = request.input('idProceso');
        const idPersonaOpinante = request.input('idPersona');

        const query =  `call ede_getResultadoPorOpinante('${idProceso}', '${idPersonaOpinante}')`;

        console.log(query);
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

module.exports=Reporte