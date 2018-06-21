'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
const dateformat = require('dateformat');
class Marketplace {
    async posiblesVacantes({request,response}){
    
        
        var idProceso = request.input("idProceso");
        var idPersonaOpinante = request.input("idPersonaOpinante");
        const cliente = request.input('cliente');
        
        const query =  `call tale_posiblesVacantes('${idProceso}','${idPersonaOpinante}')`;

        const result   = await data.execQuery(cliente,query);
        const posiciones = Enumerable.from(result[0][0]).distinct("$.idPosicion").select(function(posicion){
            return{
                idPosicion:posicion.idPosicion,
                nombre:posicion.nombre,
                codigo:posicion.codigo,
                critico:posicion.critico,
                nivel:posicion.nivel,
                idPadre:posicion.idPadre,
                idPersona:posicion.idPersona,
                nombresPersona:posicion.nombresPersona,
                apellidoPaterno:posicion.apellidoPaterno,
                apellidoMaterno:posicion.apellidoMaterno,
                fotoPersona:posicion.fotoPersona,
                colorPosicion:posicion.colorPosicion,
                nombreCuadrante:posicion.nombreCuadrante,
                valor:posicion.valor,
                edd:posicion.edd,
                idCuadranteEq:posicion.idCuadranteEq,
                valorEdeEq:posicion.valorEdeEq,
                idCuadrante:posicion.idCuadrante,
                atributos:Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function(atributo){
                    return {
                        atributo:atributo.atributo,
                        colorAtributo:atributo.colorAtributo,
                        iconoAtributo:atributo.iconoAtributo,
                        tooltipAtributo:atributo.tooltipAtributo,
                    }
                }).toArray()

            }
        }).toArray()
        
        response.json(posiciones);
    }
    async talentos({request,response}){
    
        
        var idProceso = request.input("idProceso");
        var idPersonaOpinante = request.input("idPersonaOpinante");
        const cliente = request.input('cliente');
        
        const query =  `call tale_talentos('${idProceso}','${idPersonaOpinante}')`;
console.log(query)
        const result   = await data.execQuery(cliente,query);
        const posiciones = Enumerable.from(result[0][0]).distinct("$.idPosicion").select(function(posicion){
            return{
                idPosicion:posicion.idPosicion,
                nombre:posicion.nombre,
                codigo:posicion.codigo,
                critico:posicion.critico,
                nivel:posicion.nivel,
                idPadre:posicion.idPadre,
                idPersona:posicion.idPersona,
                nombresPersona:posicion.nombresPersona,
                apellidoPaterno:posicion.apellidoPaterno,
                apellidoMaterno:posicion.apellidoMaterno,
                fotoPersona:posicion.fotoPersona,
                colorPosicion:posicion.colorPosicion,
                nombreCuadrante:posicion.nombreCuadrante,
                valor:posicion.valor,
                edd:posicion.edd,
                idCuadranteEq:posicion.idCuadranteEq,
                valorEdeEq:posicion.valorEdeEq,
                idCuadrante:posicion.idCuadrante,
                atributos:Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function(atributo){
                    return {
                        atributo:atributo.atributo,
                        colorAtributo:atributo.colorAtributo,
                        iconoAtributo:atributo.iconoAtributo,
                        tooltipAtributo:atributo.tooltipAtributo,
                    }
                }).toArray()

            }
        }).toArray()
        
        response.json(posiciones);
    }

    async vacantes({request,response}){
    
        
        var idProceso = request.input("idProceso");
        var idPersonaOpinante = request.input("idPersonaOpinante");
        const cliente = request.input('cliente');
        
        const query =  `call tale_vacantes('${idProceso}','${idPersonaOpinante}')`;

        const result   = await data.execQuery(cliente,query);
        const posiciones = Enumerable.from(result[0][0]).distinct("$.idPosicion").select(function(posicion){
            return{
                idPosicion:posicion.idPosicion,
                nombre:posicion.nombre,
                codigo:posicion.codigo,
                critico:posicion.critico,
                nivel:posicion.nivel,
                idPadre:posicion.idPadre,
                idPersona:posicion.idPersona,
                nombresPersona:posicion.nombresPersona,
                apellidoPaterno:posicion.apellidoPaterno,
                apellidoMaterno:posicion.apellidoMaterno,
                fotoPersona:posicion.fotoPersona,
                colorPosicion:posicion.colorPosicion,
                nombreCuadrante:posicion.nombreCuadrante,
                valor:posicion.valor,
                edd:posicion.edd,
                idCuadranteEq:posicion.idCuadranteEq,
                valorEdeEq:posicion.valorEdeEq,
                idCuadrante:posicion.idCuadrante,
                atributos:Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function(atributo){
                    return {
                        atributo:atributo.atributo,
                        colorAtributo:atributo.colorAtributo,
                        iconoAtributo:atributo.iconoAtributo,
                        tooltipAtributo:atributo.tooltipAtributo,
                    }
                }).toArray()

            }
        }).toArray()
        
        response.json(posiciones);
    }
}
module.exports =Marketplace;