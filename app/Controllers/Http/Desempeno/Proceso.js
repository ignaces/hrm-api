'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
class Proceso {

    async getProcesos({request,response}){
      
        var idProceso = request.input('idProceso');
        var idEstado = request.input('idEstado');
        const cliente =request.input('cliente') ;
        const query =  `call ede_getProcesos('${idProceso}','${idEstado}')`;
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

    async getEtapasProceso({request,response}){
        var idProceso=request.input('idProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEtapasProceso('${idProceso}')`;
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

    async getMenuUsuario({request,response}){
        var idProceso=request.input('idProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getMenuUsuario('${idProceso}')`;
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

    async getProcesoPersona({request,response}){
        var idProceso=request.input('idProceso')
        var idPersona=request.input('idPersona')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getProcesoPersona('${idProceso}','${idPersona}')`;
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
module.exports=Proceso