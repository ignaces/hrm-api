'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
/**
 * Medicion
 * @class
 */
class Medicion {

    

    async validarCodigo({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")  ;
        var codigo = request.input("codigo");
        const cliente =request.input('cliente') ;
        const query =`call encu_getEncuestaPersona('${idEncuestaAplicacion}','${codigo}')`;

        const result   = await data.execQuery(cliente,query);
        var validacion ={};
        if(!result[0]){
            validacion.continua = false;
            validacion.mensaje="No existe el código ingresado"
        }else{
            validacion.encuestaPersona= result[0][0][0];
            if(validacion.encuestaPersona.codigo=="FINALIZADO"){
                validacion.continua=false;
            }else{
                validacion.continua=true;
            }
            
            
           
        }

        response.json(validacion);
    }

    async getInstrumento({request,response}){
        
        var idEncuestaPersona = request.input("idEncuestaPersona");
        
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
        
   
            const query =`call encuesta_getInstrumento('${idEncuestaPersona}')`;
            const preguntas   = await data.execQuery(cliente,query);
           
            const dimensiones = Enumerable.from(preguntas[0][0]).distinct("$.dimensionCodigo").select(function(dimension){
                return{
                    id:dimension.dimensionCodigo,
                    nombre:dimension.dimension,
                    descripcion:dimension.dimensionDescripcion

                }
            })
            instrumento = {
                nombre:preguntas[0][0][0].nombre,
                tipoInstrumento:"ENC",
                dimensiones:dimensiones.toArray()
            }
            for(var dimension in instrumento.dimensiones){
                var idDimension = instrumento.dimensiones[dimension].id;
                
                
                
                const preguntasUnicas = Enumerable.from(preguntas[0][0]).where(`$.dimensionCodigo == "${idDimension}"`).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
                    return{
                        id:pregunta.IdPregruntaFacsimil,
                        enunciado:pregunta.enunciado,
                        correcto:pregunta.correcto,
                        puntajeObtenido:pregunta.puntajeObtenido,
                        puntajeEsperado:pregunta.puntajeEsperado,
                        tipoPregunta:pregunta.tipoPregunta,
                        tipoDespliegue:pregunta.despliegue,
                        codigoDespliegue:pregunta.codigoDespliegue,
                        orden:pregunta.ordenPregunta
                    }
                })
                
                instrumento.dimensiones[dimension].preguntas = preguntasUnicas.toArray();

                for(var pregunta in instrumento.dimensiones[dimension].preguntas){
                    var idPregunta = instrumento.dimensiones[dimension].preguntas[pregunta].id
                    
                    const alternativas = Enumerable.from(preguntas[0][0]).where(`$.IdPregruntaFacsimil == "${idPregunta}"`).select(function(alternativa){
                        return{
                            id:alternativa.idAlternativa,
                            texto:alternativa.textoAlternativa,
                            puntaje:alternativa.puntajeAlternativa,
                            orden:alternativa.ordenAlternativa,
                            estaSeleccionada:alternativa.estaSeleccionada,
                            requiereJustificacion:"0",
                            justificacion: ""
                        }
                    }).toArray()
                    instrumento.dimensiones[dimension].preguntas[pregunta].alternativas = alternativas
                }
            }
            
            
    
           
            
        
        
        
        response.json(instrumento);
    }
}
module.exports = Medicion