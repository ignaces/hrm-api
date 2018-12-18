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
    async saveFeedback({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var txtNomPlan = request.input("txtNomPlan");
        var txtAccion = request.input("txtAccion");
        var txtObjetivo = request.input("txtObjetivo");
        var fechaInicio = request.input("fechaInicio"); 
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_savePlanFeedback('${idFeedbackOpinante}','${txtNomPlan}','${txtAccion}','${txtObjetivo}','${fechaInicio}')`;
        
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
    async getAcciones({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getAccionFeedback('${idFeedbackOpinante}')`;
        
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
    async addAccion({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");

        var txtAccion = objAccion.accion;
        var txtObjetivo = objAccion.objetivo;
        var fechaTermino = objAccion.fechaTermino;
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveAccionFeedback('${idFeedbackOpinante}','${txtAccion}','${txtObjetivo}','${fechaTermino}')`;
        
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
    async deleteAccion ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");

        var idAccion = objAccion.id;

        const cliente =request.input('cliente') ;
        const query =  `call feedback_deleteAccionFeedback('${idFeedbackOpinante}','${idAccion}')`;
        
        const respuesta = await data.execQuery(cliente,query);

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