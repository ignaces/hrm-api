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
}

module.exports = Empresa
