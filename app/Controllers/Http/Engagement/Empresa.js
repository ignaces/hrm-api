'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');

class Empresa {

    async list({request,response}){
        var idEngagementProceso = request.input("idPeriodo")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getEmpresasPeriodo('${idEngagementProceso}')`;
        
        const result   = await data.execQuery(cliente,query);
        
        const empresas = Enumerable.from(result[0][0]).distinct("$.idEmpresa").select(function(empresa){
            return{
                id:empresa.idEmpresa,
                idProcesoEmpresa:empresa.idProcesoEmpresa,
                nombre:empresa.nombreEmpresa,
                logo:empresa.logoEmpresa,
                encuestas:[]

            }
        }).toArray();

        for(var key in empresas){
            var idEmpresa = empresas[key].id;
            
            var encuestas  = Enumerable.from(result[0][0]).where(`$.idEmpresa == "${idEmpresa}"`).distinct("$.idEncuestaAplicacion").select(function(encuesta){
                return{
                    id:encuesta.idEncuestaAplicacion,
                    nombre:encuesta.nombreEncuesta,
                    estados:[]
                }
            }).toArray();
            if(encuestas[0].id==null){
                encuestas=[];
            }
          for(var i in encuestas){
              var idEncuesta = encuestas[i].id;
              var estados  = Enumerable.from(result[0][0]).where(`$.idEncuestaAplicacion == "${idEncuesta}"`).select(function(estado){
                return{
                    codigo:estado.codigoEstado,
                    texto:estado.nombreEstado,
                    class:estado.classEstado,
                    color:estado.colorEstado,
                    cantidad:estado.cantidadEstado,
                    porcentaje:Math.round(estado.porcentaje) 
                }
            }).toArray();
            
            encuestas[i].estados=estados;
          }
            



            empresas[key].encuestas = encuestas;

        }
        

        response.json(empresas);
    }
    async getAvance({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call encuesta_getAvance('${idEncuestaAplicacion}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
    }
    async getClasificaciones({request,response}){
        var idEmpresaProceso = request.input("idEmpresaProceso")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getClasificaciones('${idEmpresaProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        const clasificaciones = Enumerable.from(result[0][0]).where(`$.idPadre == null`).select(function(clasificacion){
            return{
                id:clasificacion.id,
                nombre:clasificacion.nombre,
                codigo:clasificacion.codigo,
                niveles:Enumerable.from(result[0][0]).where(`$.idPadre == "${clasificacion.id}"`).select(function(nivel){
                    return{
                        id:nivel.id,
                        idPadre:nivel.idPadre,
                        nombre:nivel.nombre,
                        codigo:nivel.codigo,
                    }}).toArray()
                }
            }).toArray();

        response.json(clasificaciones);
    }

    async addClasificacion({request,response}){
        var input = request.input("clasificacion");
        var idEmpresaProceso = input.idEmpresaProceso;


        const cliente =request.input('cliente');
        
        const query = `call engagement_addClasificacion('${idEmpresaProceso}','${input.clasificacion.nombre}','${input.clasificacion.codigo}','${input.clasificacion.idPadre}','${input.clasificacion.nivel}','${input.clasificacion.orden}');`;
        
        const result   = await data.execQuery(cliente,query);

        const clasificaciones = Enumerable.from(result[0][0]).where(`$.idPadre == null`).select(function(clasificacion){
            return{
                id:clasificacion.id,
                nombre:clasificacion.nombre,
                codigo:clasificacion.codigo,
                niveles:Enumerable.from(result[0][0]).where(`$.idPadre == "${clasificacion.id}"`).select(function(nivel){
                    return{
                        id:nivel.id,
                        idPadre:nivel.idPadre,
                        nombre:nivel.nombre,
                        codigo:nivel.codigo,
                    }}).toArray()
                }
            }).toArray();

        response.json(clasificaciones);

    }
    async addNivelClasificacion({request,response}){
        var input = request.input("clasificacion");
        var idEmpresaProceso = input.idEmpresaProceso;


        const cliente =request.input('cliente');
        
        const query = `call engagement_addClasificacion('${idEmpresaProceso}','${input.clasificacion.nombre}','${input.clasificacion.codigo}','${input.clasificacion.idPadre}','${input.clasificacion.nivel}','${input.clasificacion.orden}')`;
        
        const result   = await data.execQuery(cliente,query);

        const clasificaciones = Enumerable.from(result[0][0]).where(`$.idPadre == null`).select(function(clasificacion){
            return{
                id:clasificacion.id,
                nombre:clasificacion.nombre,
                codigo:clasificacion.codigo,
                niveles:Enumerable.from(result[0][0]).where(`$.idPadre == "${clasificacion.id}"`).select(function(nivel){
                    return{
                        id:nivel.id,
                        idPadre:nivel.idPadre,
                        nombre:nivel.nombre,
                        codigo:nivel.codigo,
                    }}).toArray()
                }
            }).toArray();

        response.json(clasificaciones);

    }
    async deleteClasificacion({request,response}){
        var idEmpresaProceso = request.input("idEmpresaProceso")
        var idClasificacion = request.input("idClasificacion")
        const cliente =request.input('cliente');
        
        const query = `call engagement_deleteClasificacion('${idEmpresaProceso}','${idClasificacion}')`;
        const result   = await data.execQuery(cliente,query);

        const clasificaciones = Enumerable.from(result[0][0]).where(`$.idPadre == null`).select(function(clasificacion){
            return{
                id:clasificacion.id,
                nombre:clasificacion.nombre,
                codigo:clasificacion.codigo,
                niveles:Enumerable.from(result[0][0]).where(`$.idPadre == "${clasificacion.id}"`).select(function(nivel){
                    return{
                        id:nivel.id,
                        idPadre:nivel.idPadre,
                        nombre:nivel.nombre,
                        codigo:nivel.codigo,
                    }}).toArray()
                }
            }).toArray();

        response.json(clasificaciones);

    }
    async getEmpresasFueraProceso({request,response}){
        var idProceso = request.input("idProceso")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getEmpresasFueraProceso('${idProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
    }
    async getAvanceClasificaciones({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getAvanceClasificaciones('${idEncuestaAplicacion}')`;
        const result   = await data.execQuery(cliente,query);
        const clasificaciones = Enumerable.from(result[0][0]).distinct("$.idClasificacion").select(function(clasificacion){
            return{
                id:clasificacion.idClasificacion,
                nombre:clasificacion.nombreClasificacion,
                niveles:Enumerable.from(result[0][0]).where(`$.idClasificacion == "${clasificacion.idClasificacion}"`).distinct("$.idNivel").select(function(nivel){
                    return{
                        id:nivel.idNivel,
                        nombre:nivel.nivelClasificacion,
                        estados:Enumerable.from(result[0][0]).where(`$.idNivel == "${nivel.idNivel}"`).select(function(estado){
                            return{
                                codigo:estado.codigoEstado,
                                texto:estado.estadoEncuesta,
                                color:estado.color,
                                icono:estado.icono,
                                porcentaje:estado.porcentaje,
                                cantidad:estado.cantidad
                            }
                        }).toArray()
                    }
                }).toArray()

            }
        }).toArray();

        
        response.json(clasificaciones);
        
    }

    async create({request,response}){
      
        var input = request.input("empresa");
        var idProceso = input.idProceso;
        const cliente =request.input('cliente') ;
        const query =`call core_createEmpresa('${input.empresa.nombre}','${input.empresa.codigo}','${input.empresa.logo}')`;
        var respuesta   = await data.execQuery(cliente,query);
        var empresa = respuesta[0][0][0];
        
        const queryProceso =`call engagement_addEmpresaProceso('${idProceso}','${empresa.id}')`;
        
        respuesta   = await data.execQuery(cliente,queryProceso);
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
        //response.json(respuesta[0][0]);
    }
}

module.exports = Empresa
