'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
const dateformat = require('dateformat');
class Accion {
    async getAccionesPredefinidas({request,response}){
    
        
        
        const cliente = request.input('cliente');
        
        const query =  `call tale_getAccionesPredefinidas()`;
        
        const result   = await data.execQuery(cliente,query);

        const acciones = result[0][0];
        
        response.json(acciones);
    }

    async getCompetencias({request,response}){
        const idModelo = '8ddf9879-63bb-11e8-8fb3-bc764e100f2b';//request.input("idModelo");
        const cliente = request.input('cliente');
        
        const query =  `call tale_getCompetencias('${idModelo}')`;
        
        
        const result   = await data.execQuery(cliente,query);

        const competencias = result[0][0];
        
        response.json(competencias);
    }

    async getPlanDesarrollo({request,response}){
        const idProceso = request.input('idProceso');
        const idPersona = request.input('idPersona');
        const cliente = request.input('cliente');
        
        var query =  `call tale_getPlanDesarrolloPersona('${idProceso}','${idPersona}')`;
        
        var resultPlan   = await data.execQuery(cliente,query);
        
        if(resultPlan[0][0].length==0){
            query =  `call tale_addPlanDesarrolloPersona('${idProceso}','${idPersona}')`;
        
            resultPlan   = await data.execQuery(cliente,query);
        }
        


        const plan = {
            idPlan:resultPlan[0][0][0].idPlan,
            acciones:Enumerable.from(resultPlan[0][0]).distinct("$.idAccion").select(function(accion){
                return{
                        id:accion.idAccion,
                        nombre:accion.nombre,
                        objetivo:accion.objetivo,
                        idCompetencia:accion.idCompetencia,
                        competencia:accion.competencia,
                        apoyoGerente:accion.apoyoGerente,
                        fechaInicio:accion.fechaInicio,
                        fechaTermino:accion.fechaTermino,
                        indicadores:Enumerable.from(resultPlan[0][0]).where(`$.idAccion=="${accion.idAccion}"`).select(function(indicador){
                            return{
                                id:indicador.idIndicador,
                                texto:indicador.indicador
                            }}).toArray()
                }}).toArray()
        };

        response.json(plan);
    }
    async getPlanDesarrolloById({request,response}){
        const idPlan = request.input('idPlan');
        
        const cliente = request.input('cliente');
        
        var query =  `call tale_getPlanDesarrolloPersonaById('${idPlan}')`;
        
        var resultPlan   = await data.execQuery(cliente,query);
        
       
        const plan = {
            idPlan:resultPlan[0][0][0].idPlan,
            acciones:Enumerable.from(resultPlan[0][0]).distinct("$.idAccion").select(function(accion){
                return{
                        id:accion.idAccion,
                        nombre:accion.nombre,
                        objetivo:accion.objetivo,
                        idCompetencia:accion.idCompetencia,
                        competencia:accion.competencia,
                        apoyoGerente:accion.apoyoGerente,
                        fechaInicio:accion.fechaInicio,
                        fechaTermino:accion.fechaTermino,
                        indicadores:Enumerable.from(resultPlan[0][0]).where(`$.idAccion=="${accion.idAccion}"`).select(function(indicador){
                            return{
                                id:indicador.idIndicador,
                                texto:indicador.indicador
                            }}).toArray()
                }}).toArray()
        };

        response.json(plan);
    }

    async addAccion({request,response}){
        const idProceso = request.input('idProceso');
        const idPlan = request.input('idPlan');
        const accion = request.input('accion').accion;

        const cliente = request.input('cliente');
        
        const query =  `call tale_addAccion('${idPlan}',0,'${accion.objetivo}','${accion.apoyoGerente}','${accion.idCompetencia}','${accion.idAccionPredeterminada}','${accion.fechaInicio}','${accion.fechaTermino}')`;
        
        
        const result   = await data.execQuery(cliente,query);

        const rAccion = result[0][0][0];

        var idAccion = rAccion.id;
        for(var i in accion.indicadores){
            const queryIndicador =  `call tale_addIndicador('${idAccion}','${accion.indicadores[i].texto}')`;
        
            const resultIndicador   = await data.execQuery(cliente,queryIndicador);
        }
        
        response.json(rAccion);
    }
}
module.exports =Accion;