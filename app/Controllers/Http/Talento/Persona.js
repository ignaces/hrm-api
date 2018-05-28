'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')

class Persona {
    async getPersona({request,response}){
    
        var idPersona = request.input('idPersona');
        var idProceso = request.input('idProceso');
        var identificador = "";
        
        const cliente = request.input('cliente');
        
        const query =  `call tale_getPersonaDetalle('${idProceso}','${idPersona}')`;
        
        
        const result   = await data.execQuery(cliente,query);
       
        
       if(result[0]==undefined){
           return response.json({})
       }
       if (result[0][0][0]==undefined){
        return response.json({})
       }
       
        
        
       const persona = Enumerable.from(result[0][0]).distinct("$.idPersona").select(function(posicion){
        return{
            idPosicion:posicion.idPosicion,
            posicion:posicion.nombre,
            codigo:posicion.codigo,
            critico:posicion.critico,
            nivel:posicion.nivel,
            idPadre:posicion.idPadre,
            idPersona:posicion.idPersona,
            nombres:posicion.nombresPersona,
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
            codigoIdioma:posicion.codigoIdioma,
            idioma:posicion.idioma,
            banderaIdioma:posicion.banderaIdioma,
            nivelIdioma:posicion.nivelIdioma,
            pais:posicion.pais,
            nombreNacionalidad:posicion.nombreNacionalidad,
            iconoPais:posicion.iconoPais,
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
    /*
codigoIdioma
idioma
banderaIdioma
nivelIdioma
pais
nombreNacionalidad 
iconoPais
     */
    response.json(persona);
    }
}

module.exports = Persona