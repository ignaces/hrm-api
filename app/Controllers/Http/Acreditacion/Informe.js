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

    async getResultadoSOT({request,response}){


        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadoSOT("${proceso}", "${procesoPersona}")`;
        const result   = await data.execQuery(cliente,query);
        
        var competencias = Enumerable.from(result[0][0]).distinct("$.codigo").select(function(competencia){
            return{
                nombre:competencia.nombreCompetencia,
                codigo:competencia.codigo,
                valor:competencia.valor,
                logro:competencia.logro,
                brecha:competencia.brecha
            }
        }).toArray()
    

        
        for(var competencia in competencias){
            var codigoCompetencia = competencias[competencia].codigo
            
            const instrumentos = Enumerable.from(result[0][0]).where(`$.codigo == "${codigoCompetencia}"`).distinct("$.nombre").select(function(instrumento){
                return{
                    nombre:instrumento.nombre,
                    total:instrumento.total,
                    totalBuenas:instrumento.totalBuenas,
                    totalMalas:instrumento.totalMalas,
                    logro:instrumento.instrumentoLogro,
                    brecha:instrumento.instrumentoBrecha
                }
            }).toArray()
            competencias[competencia].instrumentos = instrumentos
        }


        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {
              competencias: competencias
          }
          
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
        const cliente =request.input('cliente');
        
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


    async getResultadoDetalleSOT({request,response}){
        var procesoPersona = request.input("procesoPersona");
        var instrumento = [];
        const cliente =request.input('cliente');
        
        const query =`call acre_getResultadoDetalleSOT('','${procesoPersona}')`;
        const result   = await data.execQuery(cliente,query);



        const instrumentos = Enumerable.from(result[0][0]).distinct("$.idOpinante").select(function(instrumento){
            return{
                id:instrumento.idOpinante
            }
        }).toArray()
    

        
        for(var instrumento in instrumentos){
            var idOpinante = instrumentos[instrumento].id
            
            const competencias = Enumerable.from(result[0][0]).where(`$.idOpinante == "${idOpinante}"`).distinct("$.competencia").select(function(competencia){
                return{                    
                    competencia:competencia.competencia                    
                }
            }).toArray()
            instrumentos[instrumento].competencias = competencias

            for(var competencia in competencias)
            {
                var nombreCompetencia = competencias[competencia].competencia

                const preguntas = Enumerable.from(result[0][0]).where(`$.competencia == "${nombreCompetencia}"`).distinct("$.actividadClave").select(function(actividadClave){
                    return{
                        actividadClave:actividadClave.actividadClave
                    }
                }).toArray()
                instrumentos[instrumento].competencias[competencia].preguntas = preguntas

                for(var pregunta in preguntas)
                {
                    var nombrePregunta = preguntas[pregunta].actividadClave

                    const criterios = Enumerable.from(result[0][0]).where(`$.actividadClave == "${nombrePregunta}"`).distinct("$.criterio").select(function(criterio){
                        return{
                            criterio:criterio.criterio,
                            
                        }
                    }).toArray()
                    instrumentos[instrumento].competencias[competencia].preguntas[pregunta].criterios = criterios

                    for(var criterio in criterios)
                {
                    var nombreCriterio = criterios[criterio].criterio

                    const alternativas = Enumerable.from(result[0][0]).where(`$.criterio == "${nombreCriterio}"`).select(function(alternativa){
                        return{
                            nivel:alternativa.nivel,
                            estaSeleccionada:alternativa.estaSeleccionada,
                            justificacion:alternativa.justificacion
                            
                        }
                    }).toArray()
                    instrumentos[instrumento].competencias[competencia].preguntas[pregunta].criterios[criterio].alternativas = alternativas

                    
                }
                }
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
