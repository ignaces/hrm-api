'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Accion {


    // --->> OBSERVACION ACCION

    async getObservacionAccion({request,response}){
       
        var idObservacionAccion=request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona=request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor=request.input('idEtapaTareaActor');
        const cliente =request.input('cliente') ;
        const query =  `call ede_getObservacionAccion('${idObservacionAccion}','${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}')`;
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

    async getObservacionAccionColaborador({request,response}){
       
        var idObservacionAccion=request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona=request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor=request.input('idEtapaTareaActor');
        const cliente =request.input('cliente') ;
        const query =  `call ede_getObservacionAccionColaborador('${idObservacionAccion}','${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}')`;
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

    async addObservacionAccion({request,response}){
      
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addObservacionAccion('${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${observacion}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async addObservacionAccionFinalizar({request,response}){
      
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addObservacionAccionFinalizar('${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${observacion}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async updObservacionAccion({request,response}){
      
        var idObservacionAccion= request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updObservacionAccion('${idObservacionAccion}','${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${observacion}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async updObservacionAccionFinalizar({request,response}){
      
        var idObservacionAccion= request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updObservacionAccionFinalizar('${idObservacionAccion}','${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${observacion}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }



    // ---<< OBSERVACION ACCION

    // --->> CONFIRMACION ACCION

    async addConfirmacionAccion({request,response}){
      
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var valor= request.input('valor');
        var cliente = request.input('cliente');
 
        console.log(idEtapaTareaAccionProcesoPersona);
        console.log(idEtapaTareaActor);
        console.log(valor);
        try{
            const query =  `call ede_addConfirmacionAccion('${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${valor}')`;
            const respuesta   = await data.execQuery(cliente,query);
            console.log(respuesta);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
               console.log(err);
            response.json({mensaje:err});
          }
    }

    async updConfirmacionAccion({request,response}){
      
        var idConfirmacionAccion= request.input('idConfirmacionAccion');
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updConfirmacionAccion('${idConfirmacionAccion}','${idEtapaTareaAccionProcesoPersona}','${idEtapaTareaActor}','${observacion}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    // ---<< CONFIRMACION ACCION

    // --->> TAREAR ACCION PROCESO PERSONA

    async addTareaAccionProcesoPersona({request,response}){
      
        var idProcesoPersona= request.input('idProcesoPersona');
        var idEtapaTareaProcesoPersona= request.input('idEtapaTareaProcesoPersona');
        var idEdeEtapaTareaAccion= request.input('idEdeEtapaTareaAccion');
        var idAccionEstado= request.input('idAccionEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addEtapaTareaAccionProcesoPersona('${idProcesoPersona}','${idEtapaTareaProcesoPersona}','${idEdeEtapaTareaAccion}','${idAccionEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async updTareaAccionProcesoPersona({request,response}){
      
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idProcesoPersona= request.input('idProcesoPersona');
        var idEtapaTareaProcesoPersona= request.input('idEtapaTareaProcesoPersona');
        var idEdeEtapaTareaAccion= request.input('idEdeEtapaTareaAccion');
        var idAccionEstado= request.input('idAccionEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updEtapaTareaAccionProcesoPersona('${idEtapaTareaAccionProcesoPersona}','${idProcesoPersona}','${idEtapaTareaProcesoPersona}','${idEdeEtapaTareaAccion}','${idAccionEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    // ---<< TAREAR ACCION PROCESO PERSONA


}

module.exports=Accion