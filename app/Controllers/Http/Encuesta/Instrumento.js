'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
/**
 * /Encuesta/Instrumento
 * @class
 */
class Instrumento {
    
    async putRespuesta({request,response}){

       
        var idEncuestaPersona = request.input("idEncuestaPersona");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");

        var isChecked = true;

        if(request.input("isChecked"))
        {
            isChecked = request.input("isChecked");
        }
            
        const cliente =request.input('cliente') ;
        if(idAlternativa==""){
            idAlternativa="null";
        }else{
            idAlternativa =`'${idAlternativa}'`;
        }
        const query = `call evaluacion_putRespuesta('${idPregunta}',${idAlternativa}, '${justificacion}', ${isChecked})`;
        const result   = await data.execQuery(cliente,query);

        console.log(query);
        
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

    async validaCierre({request,response}){
        var idEncuestaPersona = request.input("idEncuestaPersona");
        const cliente =request.input('cliente') ;
        const qEstado = `call encuesta_getValidaEncuestaFinalizada('${idEncuestaPersona}')`;
        const rEstado   = await data.execQuery(cliente,qEstado);

        return {mensaje:rEstado[0][0][0].idRespuestaEstado}
    }
   
}
module.exports = Instrumento;
