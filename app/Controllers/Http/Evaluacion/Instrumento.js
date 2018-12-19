const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const Logger = use('Logger')
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




    async getInstrumentoEde({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
            const queryObs = `call ede_getObservacion('${idOpinante}')`;
            const respuestaObs   = await data.execQuery(cliente,queryObs);

            const observacion    = respuestaObs[0][0];
            
            //console.log(queryObs);
            const queryResultados = `call ede_getResultadoGlobal('${idOpinante}')`;
            const resultadosCalibracion   = await data.execQuery(cliente,queryResultados);
            var resultadoCalibracion = "No Disponible";
            if(resultadosCalibracion[0][0][0]!=null){
                resultadoCalibracion = resultadosCalibracion[0][0][0].resultadoCalibracion;
            }
            
            const query =`call ede_getInstrumento('${idOpinante}')`;
            console.log(query)
            const rQuery   = await data.execQuery(cliente,query);
            
            const competencias = Enumerable.from(rQuery[0][0]).distinct("$.idCompetencia").select(function(competencia){
                return{
                    id:competencia.idCompetencia,
                    codigo:competencia.competenciaCodigo,
                    nombre:competencia.competencia,
                    descripcion:competencia.competenciaDescripcion

                }
            })

            const queryMet =`call ede_getInstrumentoMeta('${idOpinante}')`;
            //console.log(query);
            const rQueryMet   = await data.execQuery(cliente,queryMet);
            //console.log(rQueryMet[0][0]);
            
            const metas = Enumerable.from(rQueryMet[0][0]).distinct("$.idMeta").select(function(meta){
                return{
                    id:meta.idMeta,
                    codigo:meta.metaCodigo,
                    nombre:meta.nombre,
                    descripcion:meta.metaDescripcion

                }
            });
            //console.log("competencias")
            try{
                
                instrumento = {
                    nombre:"",
                    tipoInstrumento:"DES",
                    observacion: observacion[0].observacion,
                    competencias:competencias.toArray(),
                    metas:metas.toArray()
                }
            }
            catch(e)
            {
                instrumento = {
                    nombre:"",
                    tipoInstrumento:"DES",
                    observacion: "",
                    competencias:competencias.toArray(),
                    metas:metas.toArray()
                }
            }
            
            //console.log("instrumento")
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
                                justificacion: e.justificacion,
                                nivel: e.nivel,
                                mostrarNivel:e.mostrarNivel
                            }
                        }).toArray()
                        instrumento.competencias[competencia].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }

            
            //console.log("instrumento")
            for(var meta in instrumento.metas){
                var idMeta = instrumento.metas[meta].id
                //console.log(idMeta);
                const actividadesClave = Enumerable.from(rQueryMet[0][0]).where(`$.idMeta == "${idMeta}"`).distinct("$.idActividadClave").select(function(ac){
                    return{
                        id:ac.idActividadClave,
                        nombre:ac.actividad,
                        visible:ac.actividadVisible,
                        orden:ac.actividadOrden
                    }
                }).toArray()
                instrumento.metas[meta].actividadesClave = actividadesClave

                for(var actividadClave in actividadesClave){
                    var idActividadClave = actividadesClave[actividadClave].id
                    
                    const criterios = Enumerable.from(rQueryMet[0][0]).where(`$.idActividadClave == "${idActividadClave}"`).distinct("$.idCriterio").select(function(criterio){
                        return{
                            id:criterio.idCriterio,
                            nombre:criterio.criterio,
                            orden:criterio.criterioOrden
                        }
                    }).toArray()
                    //console.log(meta, actividadClave, criterios);
                    instrumento.metas[meta].actividadesClave[actividadClave].criterios = criterios
                    
                    for(var criterio in criterios){
                        var idCriterio = criterios[criterio].id
                        
                        const escala = Enumerable.from(rQueryMet[0][0]).where(`$.idCriterio == "${idCriterio}"`).select(function(e){
                            return{
                                id:e.idEscalaNivel,
                                nombre:e.nivelEscala,
                                orden:e.ordenEscala,
                                valor:e.valorEscala,
                                requiereJustificacion:e.requiereJustificacion,
                                indicador:e.indicador,
                                estaSeleccionada:e.estaSeleccionada,                                
                                justificacion: e.justificacion,
                                nivel: e.nivel,
                                mostrarNivel:e.mostrarNivel
                            }
                        }).toArray()
                        instrumento.metas[meta].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }
            
            const queryResultado = `call ede_calculaEvaluacion('${idOpinante}')`;
            console.log(queryResultado)
            const resultado  = await data.execQuery(cliente,queryResultado);
            instrumento.resultadoCompetencias={nivel:"No Disponible"};
            instrumento.resultadoMetas = {nivel:"No Disponible"};
            instrumento.resultadoCalibracion = {nivel:resultadoCalibracion};
            instrumento.resultadoGlobal = {nivel:"No Disponible"};
            if(resultado[0][0][0]!=null){
                instrumento.resultadoCompetencias = resultado[0][0][0];
            }
            if(resultado[0][1][0]!=null){
                instrumento.resultadoMetas = resultado[0][1][0];
            }

            if(instrumento.resultadoMetas.nivel!="No Disponible" && instrumento.resultadoCompetencias.nivel!="No Disponible"){
                instrumento.resultadoGlobal = {nivel:`${instrumento.resultadoCompetencias.nivel}${instrumento.resultadoMetas.nivel}`};
            }

            console.log(instrumento.resultadoCompetencias.nivel)
            console.log(instrumento.resultadoMetas.nivel)
            try{
                if(typeof instrumento.resultadoCompetencias.promedio != "undefined" || typeof instrumento.resultadoCompetencias.promedioResultado != "undefined" ){

                    const queryResultadoFinal = `call ede_getResultadoGlobalPonderado('${idOpinante}', '${instrumento.resultadoCompetencias.promedio}', '${instrumento.resultadoMetas.promedioResultado}')`;
                    const resultadoFinal  = await data.execQuery(cliente,queryResultadoFinal);
                    if(resultadoFinal[0][0]!=null)
                    {
                        var final = resultadoFinal[0][0];
                        final = final[0].nivel;
                        if(final != null)
                        {
                            instrumento.resultadoGlobal = {nivel:` ${final}`};
                        }
                    }
                }
            }
            catch(e)
            {

            }
            //console.log(final[0].nivel)
            //console.log(final)
        response.json(instrumento);
    }

    async getInstrumentoEdeReporteCriterio({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
            const queryObs = `call ede_getObservacion('${idOpinante}')`;
            const respuestaObs   = await data.execQuery(cliente,queryObs);

            const observacion    = respuestaObs[0][0];
            
            //console.log(queryObs);
            const queryResultados = `call ede_getResultadoGlobal('${idOpinante}')`;
            const resultadosCalibracion   = await data.execQuery(cliente,queryResultados);
            var resultadoCalibracion = "No Disponible";
            if(resultadosCalibracion[0][0][0]!=null){
                resultadoCalibracion = resultadosCalibracion[0][0][0].resultadoCalibracion;
            }
            
            const query =`call ede_getInstrumentoReporteCriterio('${idOpinante}')`;
            console.log(query)
            const rQuery   = await data.execQuery(cliente,query);
            
            const competencias = Enumerable.from(rQuery[0][0]).distinct("$.idCompetencia").select(function(competencia){
                return{
                    id:competencia.idCompetencia,
                    codigo:competencia.competenciaCodigo,
                    nombre:competencia.competencia,
                    descripcion:competencia.competenciaDescripcion

                }
            })

            const queryMet =`call ede_getInstrumentoMeta('${idOpinante}')`;
            //console.log(query);
            const rQueryMet   = await data.execQuery(cliente,queryMet);
            //console.log(rQueryMet[0][0]);
            
            const metas = Enumerable.from(rQueryMet[0][0]).distinct("$.idMeta").select(function(meta){
                return{
                    id:meta.idMeta,
                    codigo:meta.metaCodigo,
                    nombre:meta.nombre,
                    descripcion:meta.metaDescripcion

                }
            });
            //console.log("competencias")
            try{
                
                instrumento = {
                    nombre:"",
                    tipoInstrumento:"DES",
                    observacion: observacion[0].observacion,
                    competencias:competencias.toArray(),
                    metas:metas.toArray()
                }
            }
            catch(e)
            {
                instrumento = {
                    nombre:"",
                    tipoInstrumento:"DES",
                    observacion: "",
                    competencias:competencias.toArray(),
                    metas:metas.toArray()
                }
            }
            
            //console.log("instrumento")
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
                                justificacion: e.justificacion,
                                nivel: e.nivel,
                                mostrarNivel:e.mostrarNivel
                            }
                        }).toArray()
                        instrumento.competencias[competencia].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }

            
            //console.log("instrumento")
            for(var meta in instrumento.metas){
                var idMeta = instrumento.metas[meta].id
                //console.log(idMeta);
                const actividadesClave = Enumerable.from(rQueryMet[0][0]).where(`$.idMeta == "${idMeta}"`).distinct("$.idActividadClave").select(function(ac){
                    return{
                        id:ac.idActividadClave,
                        nombre:ac.actividad,
                        visible:ac.actividadVisible,
                        orden:ac.actividadOrden
                    }
                }).toArray()
                instrumento.metas[meta].actividadesClave = actividadesClave

                for(var actividadClave in actividadesClave){
                    var idActividadClave = actividadesClave[actividadClave].id
                    
                    const criterios = Enumerable.from(rQueryMet[0][0]).where(`$.idActividadClave == "${idActividadClave}"`).distinct("$.idCriterio").select(function(criterio){
                        return{
                            id:criterio.idCriterio,
                            nombre:criterio.criterio,
                            orden:criterio.criterioOrden
                        }
                    }).toArray()
                    //console.log(meta, actividadClave, criterios);
                    instrumento.metas[meta].actividadesClave[actividadClave].criterios = criterios
                    
                    for(var criterio in criterios){
                        var idCriterio = criterios[criterio].id
                        
                        const escala = Enumerable.from(rQueryMet[0][0]).where(`$.idCriterio == "${idCriterio}"`).select(function(e){
                            return{
                                id:e.idEscalaNivel,
                                nombre:e.nivelEscala,
                                orden:e.ordenEscala,
                                valor:e.valorEscala,
                                requiereJustificacion:e.requiereJustificacion,
                                indicador:e.indicador,
                                estaSeleccionada:e.estaSeleccionada,                                
                                justificacion: e.justificacion,
                                nivel: e.nivel,
                                mostrarNivel:e.mostrarNivel
                            }
                        }).toArray()
                        instrumento.metas[meta].actividadesClave[actividadClave].criterios[criterio].escala = escala
                    }
                }
            }
            
            const queryResultado = `call ede_calculaEvaluacion('${idOpinante}')`;
            console.log(queryResultado)
            const resultado  = await data.execQuery(cliente,queryResultado);
            instrumento.resultadoCompetencias={nivel:"No Disponible"};
            instrumento.resultadoMetas = {nivel:"No Disponible"};
            instrumento.resultadoCalibracion = {nivel:resultadoCalibracion};
            instrumento.resultadoGlobal = {nivel:"No Disponible"};
            if(resultado[0][0][0]!=null){
                instrumento.resultadoCompetencias = resultado[0][0][0];
            }
            if(resultado[0][1][0]!=null){
                instrumento.resultadoMetas = resultado[0][1][0];
            }

            if(instrumento.resultadoMetas.nivel!="No Disponible" && instrumento.resultadoCompetencias.nivel!="No Disponible"){
                instrumento.resultadoGlobal = {nivel:`${instrumento.resultadoCompetencias.nivel}${instrumento.resultadoMetas.nivel}`};
            }

            instrumento.resultadoCompetencias.promedio = parseFloat(instrumento.resultadoCompetencias.promedio).toFixed(2);
            instrumento.resultadoMetas.promedioResultado = parseFloat(instrumento.resultadoMetas.promedioResultado).toFixed(2);

            if(typeof instrumento.resultadoCompetencias.promedio != "undefined" || typeof instrumento.resultadoCompetencias.promedioResultado != "undefined" ){

                const queryResultadoFinal = `call ede_getResultadoGlobalPonderado('${idOpinante}', '${instrumento.resultadoCompetencias.promedio}', '${instrumento.resultadoMetas.promedioResultado}')`;
                console.log(queryResultadoFinal)
                const resultadoFinal  = await data.execQuery(cliente,queryResultadoFinal);
                console.log(resultadoFinal[0][0])
                if(resultadoFinal[0][0]!=null)
                {
                    var final = resultadoFinal[0][0];
                    final = final[0].nivel;
                    //console.log(final[0].resultadoTotal)

                    var resultTotal = resultadoFinal[0][0];
                    resultTotal = resultTotal[0].resultadoTotal;
                    //console.log(resultTotal[0].resultadoTotal)


                    if(final != null)
                    {
                        instrumento.resultadoGlobal = {nivel:` ${final}`, total:` ${resultTotal}`};
                    }
                }
            }
        response.json(instrumento);
    }
    async getParametrosValidacionEvaluacion({request,response}){
        const cliente =request.input('cliente') ;
        
        const query = `call ede_getParametrosValidacion()`;
        const respuesta   = await data.execQuery(cliente,query);

        const parametros    = respuesta[0][0];

        response.json(parametros);
    }

    async saveEvaluacionEde({request,response}){
       
        var idOpinante      = request.input("idOpinante");
        var observacion     = request.input("observacion");
        var finaliza        = request.input("finaliza");

        const cliente =request.input('cliente') ;
        
        const query = `call ede_putObservacion('${idOpinante}', '${observacion}')`;

        
        const result   = await data.execQuery(cliente,query);
        
        if(finaliza == 1)
        {
            const queryEst = `call ede_saveEstadoEvaluacion('${idOpinante}')`;

            //console.log(queryEst);
            const result   = await data.execQuery(cliente,queryEst);
        
        }
        const queryResultado = `call ede_calculaEvaluacion('${idOpinante}')`;

        
        const resultado  = await data.execQuery(cliente,queryResultado);

        var resultados={};
        resultados.resultadoCompetencias={nivel:"No Disponible"};
        resultados.resultadoMetas = {nivel:"No Disponible"};
        resultados.resultadoGlobal = {nivel:"No Disponible"};
        if(resultado[0][0][0]!=null){
            resultados.resultadoCompetencias = resultado[0][0][0];
        }
        if(resultado[0][1][0]!=null){
            resultados.resultadoMetas = resultado[0][1][0];
        }
        if(resultados.resultadoMetas.nivel!="No Disponible" && resultados.resultadoCompetencias.nivel!="No Disponible"){
            resultados.resultadoGlobal = {nivel:`${resultados.resultadoCompetencias.nivel}${resultados.resultadoMetas.nivel}`};
        }
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          },
          data:resultados
          
        }
        response.json(body);
    }
    
    async getEscala({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        
        const cliente =request.input('cliente') ;

        const query =`call ede_getEscala('${idOpinante}')`;
        
        
        const rQuery   = await data.execQuery(cliente,query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rQuery[0][0]
        }); 
    }

    //getNivelPromedioCompetencia = function (idOpinante, cliente, resultado){
    //    const q =`call ede_getNivelPromedioCompetencia('${idOpinante}', '${resultado}')`;
    //    console.log(q)
    //    return "";
    //}
    
    async getNivelPromedioCompetencia({request,response})
    {
        var idOpinante = request.input("idOpinante");
        const cliente =request.input('cliente') ;
        const resultado =request.input('resultado') ;
    
        if(!isNaN(resultado)){
            try{
                const q =`call ede_getNivelPromedioCompetencia('${idOpinante}', '${resultado}')`;
                const r   = await data.execQuery(cliente,q);

                response.json({
                    "estado": {
                        "codigo": "OK",
                        "mensaje": ""
                    },
                    "paginacion": "",
                    "data": r[0][0]
                });
            }
            catch(e)
            {
                console.log("error " + e)
            }
        }

    }


    async getPromedioGeneral({request,response}){

        
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var codigo = request.input("codigoActor");
        var idProceso = request.input("idProceso");


        const cliente =request.input('cliente') ;

        const query =`call ede_getPromedioGeneral('${idOpinante}','${codigo}','${idProceso}')`;
        console.log(query)
        try{

        const rQuery   = await data.execQuery(cliente,query);
        
        //Logger.debug(`query:${query},mensaje:OK`);
            const competencias = Enumerable.from(rQuery[0][0]).distinct("$.idCompetencia").select(function(c){
                return{
                    id: c.idCompetencia,
                    competencia: c.competencia,
                    nivelAuto: "No Disponible",
                    nivelSup: "No Disponible",
                    nivelFunc: "No Disponible",
                    codigoActor:c.codigoActor,
                    valorAuto: null,
                    valorSup: null,
                    valorFunc: null
                }
            }).toArray()
            Logger.debug(`linea:514,mensaje:OK`);
                const competenciasSalida = Enumerable.from(rQuery[0][0]).select(function(c){
                    return{
                        id: c.idCompetencia,
                        competencia: c.competencia,
                        nivelAuto: c.nivelAuto,
                        nivelSup: c.nivelSup,
                        nivelFunc: c.nivelFunc,
                        codigoActor:c.codigoActor,
                        valorAuto: c.valorAuto,
                        valorSup: c.valorSup,
                        valorFunc: c.valorFunc
                    }
                }).toArray()
                var sumValoresAuto = 0;
                var cantCriteriosAuto = 0;

                var sumValoresSup = 0;
                var cantCriteriosSup = 0;

                var sumValoresFunc = 0;
                var cantCriteriosFunc = 0;


                Logger.debug(`linea:528,mensaje:OK`);
                competencias.forEach(e => {
                    sumValoresAuto = 0;
                    cantCriteriosAuto = 0;

                    sumValoresSup = 0;
                    cantCriteriosSup = 0;

                    sumValoresFunc = 0;
                    cantCriteriosFunc = 0;

                    competenciasSalida.forEach(c => {
                        
                        if(e.id == c.id && c.nivelAuto != "No Disponible"){
                            e.nivelAuto = c.nivelAuto;
                        }
                        
                        if(e.id == c.id && c.nivelSup != "No Disponible"){
                            e.nivelSup = c.nivelSup;
                        }
    
                        if(e.id == c.id && c.nivelFunc != "No Disponible"){
                            e.nivelFunc = c.nivelFunc;
                        }
    
                        if(e.id == c.id && c.valorAuto != null){
                            sumValoresAuto = sumValoresAuto + c.valorAuto;
                            cantCriteriosAuto++;
                            e.valorAuto = sumValoresAuto/cantCriteriosAuto;
                            e.nivelAuto = sumValoresAuto/cantCriteriosAuto;
                            e.valorAuto = parseFloat(e.valorAuto).toFixed(2);
                            e.nivelAuto = parseFloat(e.nivelAuto).toFixed(2);
                        }
    
                        if(e.id == c.id && c.valorSup != null){
                           // e.valorSup = c.valorSup;
                            sumValoresSup = sumValoresSup + c.valorSup;
                            cantCriteriosSup++;
                            e.valorSup = sumValoresSup/cantCriteriosSup;
                            e.nivelSup = sumValoresSup/cantCriteriosSup;
                            e.valorSup = parseFloat(e.valorSup).toFixed(2);
                            e.nivelSup = parseFloat(e.nivelSup).toFixed(2);    
                        }
                        
                        if(e.id == c.id && c.valorFunc != null){
                            e.valorFunc = c.valorFunc;
                            sumValoresFunc = sumValoresFunc + c.valorFunc;
                            cantCriteriosFunc++;
                            e.valorFunc = sumValoresFunc/cantCriteriosFunc;
                            e.nivelFunc = sumValoresFunc/cantCriteriosFunc;
                            e.valorFunc = parseFloat(e.valorFunc).toFixed(2);
                            e.nivelFunc = parseFloat(e.nivelFunc).toFixed(2);        
                        }
                    });
                    
                });
    
                Logger.debug(`linea:558,mensaje:OK`);

            if(typeof competencias == "undefined" || competencias == null || competencias.length == null || competencias.length == 0)
            {
                const competenciasVacias = Enumerable.from(rQuery[0][0]).select(function(c){
                    return{
                        id: c.idCompetencia,
                        competencia: c.competencia,
                        nivelAuto: c.nivelAuto,
                        nivelSup: c.nivelSup,
                        nivelFunc: c.nivelFunc,
                        codigoActor:c.codigoActor,
                        valorAuto: c.valorAuto,
                        valorSup: c.valorSup,
                        valorFunc: c.valorFunc// ,
                        //estaSeleccionada: c.estaSeleccionada
                    }
                }).toArray()
                Logger.debug(`linea:578,mensaje:OK`);
                response.json(competenciasVacias); 
            }
            else
            {
                Logger.debug(`linea:583,mensaje:OK`);
                response.json(competencias); 
            }
        }catch(ex){
            //Logger.debug(`query:${query},mensaje:${ex.message}`);
            console.log(ex)
        }
        
    }
}

module.exports = Instrumento