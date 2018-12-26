'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
const dateformat = require('dateformat');

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
    async getCompetenciasOpinante({request,response}){
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call pda_getCompetenciasOpinante('${idFeedbackOpinante}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

    const rCompetencias= respuesta[0][0];
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rCompetencias
        });     
    }
    async getAcciones({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getAccionFeedback('${idFeedbackOpinante}')`;

        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idComptetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async getEstadoPlan ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getEstadoPlan('${idFeedbackOpinante}')`;
        
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
        var idCompetencia = objAccion.idCompetencia;
        var txtAccion = objAccion.accion;
        var txtObjetivo = objAccion.objetivo;
        var fechaTermino = objAccion.fechaTermino;
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveAccionFeedback('${idFeedbackOpinante}','${idCompetencia}','${txtAccion}','${txtObjetivo}','${fechaTermino}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idCompetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async updateAccion ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");
        var idCompetencia = request.input("idCompetencia");
        var idAccion = objAccion.id;
        var txtAccion = objAccion.accion;
        var txtObjetivo = objAccion.objetivo;
        var fechaTermino = objAccion.fechaTermino;
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_updateAccionFeedback('${idFeedbackOpinante}','${idCompetencia}','${idAccion}','${txtAccion}','${txtObjetivo}','${fechaTermino}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idCompetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async deleteAccion ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");

        var idAccion = objAccion.id;

        const cliente =request.input('cliente') ;
        const query =  `call feedback_deleteAccionFeedback('${idFeedbackOpinante}','${idAccion}')`;
        
        const respuesta = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async finalizarPlan ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");

        const cliente =request.input('cliente') ;
        const query =  `call feedback_finalizarPlanFeedback('${idFeedbackOpinante}')`;
        
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