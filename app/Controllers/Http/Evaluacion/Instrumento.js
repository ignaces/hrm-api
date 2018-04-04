const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
//jTest
class Instrumento {

   
    async creaFacsimil({request,response}){
    
        var id = request.input("idInstrumento");

        const cliente =request.input('cliente') ;
        const query =`call creaFacsimil('${id}')`;
        const facsimil   = await data.execQuery(cliente,query);
      
      
      /**
       * 
       * Crear facsimil
       * retornar idFacsimil
       * 
       */
      response.json(facsimil[0][0]);
    }
    async getAvanceFacsimil({request,response}){
        const cliente =request.input('cliente') ;
        const idFacsimil =request.input('idFacsimil');
       
        const query =`call evaluacion_getAvanceFacsimil('${idFacsimil}')`;
        const rQuery   = await data.execQuery(cliente,query);

        var resultados = rQuery[0][0][0];

        if (!resultados.Contestadas){
            resultados.Contestadas = 0;
        }
        if (!resultados.noContestadas){
            resultados.noContestadas = 0;
        }
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {avance: resultados}
          
        }
        response.json(body);


    }
    async getInstrumento({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var tipoInstrumento = request.input("tipoInstrumento");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
        
        if(tipoInstrumento!="TCO"){
            const query =`call acre_getInstrumento('${idOpinante}')`;
            const rQuery   = await data.execQuery(cliente,query);
    
            const competencias = Enumerable.from(rQuery[0][0]).distinct("$.idCompetencia").select(function(competencia){
                return{
                    id:competencia.idCompetencia,
                    codigo:competencia.competenciaCodigo,
                    nombre:competencia.competencia,
                    descripcion:competencia.competenciaDescripcion

                }
            })

            instrumento = {
                nombre:"",
                tipoInstrumento:tipoInstrumento,
                competencias:competencias.toArray()
            }
            
            for(var competencia in instrumento.competencias){
                var idCompetencia = instrumento.competencias[competencia].id
                
                const actividadesClave = Enumerable.from(rQuery[0][0]).where(`$.idCompetencia == "${idCompetencia}"`).distinct("$.idActividadClave").select(function(ac){
                    return{
                        id:ac.idActividadClave,
                        nombre:ac.actividad,
                        visible:ac.actividadVisible,
                        orden:ac.actividadOrden
                    }
                }).toArray()
                instrumento.competencias[competencia].actividadesClave = actividadesClave

                for(var actividadClave in actividadesClave){
                    var idActividadClave = actividadesClave[actividadClave].id
                    
                    const criterios = Enumerable.from(rQuery[0][0]).where(`$.idActividadClave == "${idActividadClave}"`).distinct("$.idCriterio").select(function(criterio){
                        return{
                            id:criterio.idCriterio,
                            nombre:criterio.criterio,
                            orden:criterio.criterioOrden
                        }
                    }).toArray()
                    instrumento.competencias[competencia].actividadesClave[actividadClave].criterios = criterios

                    for(var criterio in criterios){
                        var idCriterio = criterios[criterio].id
                        
                        const escala = Enumerable.from(rQuery[0][0]).where(`$.idCriterio == "${idCriterio}"`).select(function(e){
                            return{
                                id:e.idEscalaNivel,
                                nombre:e.nivelEscala,
                                orden:e.ordenEscala,
                                valor:e.valorEscala,
                                requiereJustificacion:e.requiereJustificacion,
                                indicador:e.indicador,
                                estaSeleccionada:e.estaSeleccionada,                                
                                justificacion: e.justificacion
                            }
                        }).toArray()
                        instrumento.competencias[competencia].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }
            
    
        }else{
            const query =`call acre_getEvaluacionPersona('${idOpinante}')`;
            const preguntas   = await data.execQuery(cliente,query);

            const preguntasUnicas = Enumerable.from(preguntas[0][0]).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
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
                tipoInstrumento:tipoInstrumento,
                preguntas:preguntasUnicas.toArray()
            }
            for(var pregunta in instrumento.preguntas){
                var idPregunta = instrumento.preguntas[pregunta].idPreguntaFacsimil
                
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
                instrumento.preguntas[pregunta].alternativas = alternativas
            }
        }
        
        
        response.json(instrumento);
    }
    async getFacsimil({request,response}){
    
        var id = request.input("idFacsimil");

        const cliente =request.input('cliente') ;
        const query =  `call getPreguntasFacsimil('${id}')`;
        const preguntas   = await data.execQuery(cliente,query);
        
        const preguntasUnicas = Enumerable.from(preguntas[0][0]).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
            return{
                idPreguntaFacsimil:pregunta.IdPregruntaFacsimil,
                enunciado:pregunta.enunciado,
                correcto:pregunta.correcto,
                puntajeObtenido:pregunta.puntajeObtenido,
                puntajeEsperado:pregunta.puntajeEsperado,
                tipoPregunta:pregunta.tipoPregunta
            }
        })
        

        var facsimil = {
            nombre:preguntas[0][0][0].nombre,
            preguntas:preguntasUnicas.toArray()
        }
        for(var pregunta in facsimil.preguntas){
            var idPregunta = facsimil.preguntas[pregunta].idPreguntaFacsimil
            
            const alternativas = Enumerable.from(preguntas[0][0]).where(`$.IdPregruntaFacsimil == "${idPregunta}"`).select(function(alternativa){
                return{
                    id:alternativa.idAlternativa,
                    texto:alternativa.textoAlternativa,
                    puntaje:alternativa.puntajeAlternativa,
                    orden:alternativa.ordenAlternativa
                }
            }).toArray()
            facsimil.preguntas[pregunta].alternativas = alternativas
        }
        
        return(facsimil);
    }


}

module.exports = Instrumento