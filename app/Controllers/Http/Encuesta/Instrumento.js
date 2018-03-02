'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
/**
 * Instrumento
 * @class
 */
class Instrumento {
 /**
     * @param  {string} cliente
     * @param  {} idEncuestaPersona
     * @param  {} idPregunta
     * @param  {} idAlternativa
     * @param  {} justificacion
     */
    async putRespuesta({request,response}){
       
        var idEncuestaPersona = request.input("idEncuestaPersona");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");
        const cliente =request.input('cliente') ;
        if(idAlternativa==""){
            idAlternativa="null";
        }else{
            idAlternativa =`'${idAlternativa}'`;
        }
        const query = `call evaluacion_putRespuesta('${idPregunta}',${idAlternativa}, '${justificacion}')`;
        const result   = await data.execQuery(cliente,query);
        
        const qEstado = `call encuesta_setEstadoEncuestaPersona('${idEncuestaPersona}','ENPROCESO')`;
        const rEstado   = await data.execQuery(cliente,qEstado);
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);
    }
    async cerrarInstrumento({request,response}){
        var idEncuestaPersona = request.input("idEncuestaPersona");
        const cliente =request.input('cliente') ;
        const qEstado = `call encuesta_setEstadoEncuestaPersona('${idEncuestaPersona}','FINALIZADO')`;
        const rEstado   = await data.execQuery(cliente,qEstado);

        return {mensaje:"OK"}
    }
}
module.exports = Instrumento;
