const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
/**
 *Esta clase ....
 * @constructor
 */
class Informe {

    async getResultadoSistesis({request,response}){


        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadoSintesis("${proceso}", "${procesoPersona}")`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: result[0][0]
        }
        response.json(body);
    }

    async getResultadoTCO({request,response}){


        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadoTCO("${proceso}", "${procesoPersona}")`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: result[0][0]
          
          
        }
        response.json(body);
    }

    async getInstrumentosTCO({request,response}){
        var procesoPersona = request.input("procesoPersona");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
        const query =`call acre_getInformeEvaluacionesTCO('${procesoPersona}')`;
        const preguntas   = await data.execQuery(cliente,query);

        const preguntasUnicas = Enumerable.from(preguntas[0][0]).distinct("$.idPregruntaFacsimil").select(function(pregunta){
            return{
                idPreguntaFacsimil:pregunta.IdPregruntaFacsimil,
                enunciado:pregunta.enunciado,
                correcto:pregunta.correcto,
                puntajeObtenido:pregunta.puntajeObtenido,
                puntajeEsperado:pregunta.puntajeEsperado,
                tipoPregunta:pregunta.tipoPregunta
            }
        })
    
        instrumento = {
            nombre:preguntas[0][0][0].nombre,
            preguntas:preguntasUnicas.toArray()
        }
        for(var pregunta in instrumento.preguntas){
            var idPregunta = instrumento.preguntas[pregunta].idPreguntaFacsimil
            
            const alternativas = Enumerable.from(preguntas[0][0]).where(`$.idPregruntaFacsimil == "${idPregunta}"`).select(function(alternativa){
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
            instrumento.preguntas[pregunta].alternativas = alternativas
        }
    
        response.json(instrumento);
    }
    
}

module.exports = Informe
