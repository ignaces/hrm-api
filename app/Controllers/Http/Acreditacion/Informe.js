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


    async getResultadosProceso({request,response}){
        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call getReporteAcreditacion('${proceso}')`;

        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {
              procesos: result[0][0]
          }
          
        }
        response.json(body);
    }

    async getPersonasProcesoResultados({request,response}){
      

        const proceso = request.input('proceso');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadosPersonasProceso('${proceso}')`;

        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {
              personas: result[0][0]
          }
          
        }
        response.json(body);
    }
    async getInstrumentosTCO({request,response}){
        var procesoPersona = request.input("procesoPersona");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
        const query =`call acre_getInformeEvaluacionesTCO('${procesoPersona}')`;
        const result   = await data.execQuery(cliente,query);



        const instrumentos = Enumerable.from(result[0][0]).distinct("$.codigoInstrumento").select(function(instrumento){
            return{
                nombre:instrumento.nombreInstrumento,
                codigo:instrumento.codigoInstrumento
            }
        }).toArray()
    

        
        for(var instrumento in instrumentos){
            var codigoInstrumento = instrumentos[instrumento].codigo
            
            const preguntas = Enumerable.from(result[0][0]).where(`$.codigoInstrumento == "${codigoInstrumento}"`).distinct("$.idPreguntaFacsimil").select(function(pregunta){
                return{
                    idPreguntaFacsimil:pregunta.idPreguntaFacsimil,
                    enunciado:pregunta.enunciado,
                    correcto:pregunta.correcto,
                    puntajeObtenido:pregunta.puntajeObtenido,
                    puntajeEsperado:pregunta.puntajeEsperado,
                    tipoPregunta:pregunta.tipoPregunta
                }
            }).toArray()
            instrumentos[instrumento].preguntas = preguntas

            for(var pregunta in preguntas)
            {
                var idPregunta = preguntas[pregunta].idPreguntaFacsimil

                const alternativas = Enumerable.from(result[0][0]).where(`$.idPreguntaFacsimil == "${idPregunta}"`).select(function(alternativa){
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
                instrumentos[instrumento].preguntas[pregunta].alternativas = alternativas
            }

        }


        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {
              instrumento: instrumentos
          }
          
        }
    
        response.json(body);
    }
    
}

module.exports = Informe
