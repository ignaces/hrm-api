const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Instrumento {

   
    async creaFacsimil({request,response}){
    
      var id = request.input("idInstrumento");
      
      const query = `call creaFacsimil('${id}')`;
      const facsimil   = await Database.connection('dev').schema.raw(query);
      /**
       * 
       * Crear facsimil
       * retornar idFacsimil
       * 
       */
      response.json(facsimil[0][0]);
    }
    
    async getInstrumento({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var tipoInstrumento = request.input("tipoInstrumento");
        var instrumento = [];
        
        if(tipoInstrumento!="TCO"){
            const query =`call acre_getInstrumento('${idOpinante}')`;
            const rQuery =  await Database.connection('dev').schema.raw(query);
    
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
                                estaSeleccionada:e.estaSeleccionada
                            }
                        }).toArray()
                        instrumento.competencias[competencia].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }
            
    
        }else{
            const query =`call acre_getEvaluacionPersona('${idOpinante}')`;
            const preguntas =  await Database.connection('dev').schema.raw(query);

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
                        estaSeleccionada:alternativa.estaSeleccionada
                    }
                }).toArray()
                instrumento.preguntas[pregunta].alternativas = alternativas
            }
        }
        
        
        response.json(instrumento);
    }
    async getFacsimil({request,response}){
    
        var id = request.input("idFacsimil");
        
        const query = `call getPreguntasFacsimil('${id}')`;
        const preguntas   = await Database.connection('dev').schema.raw(query);
        
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