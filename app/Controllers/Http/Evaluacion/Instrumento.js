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




    async getInstrumentoEde({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
            const queryObs = `call ede_getObservacion('${idOpinante}')`;
            const respuestaObs   = await data.execQuery(cliente,queryObs);

            const observacion    = respuestaObs[0][0];
            
            //console.log(queryObs);
            
            const query =`call ede_getInstrumento('${idOpinante}')`;
            console.log(query);
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

        
            const resultado  = await data.execQuery(cliente,queryResultado);
            instrumento.resultadoCompetencias={nivel:"No Disponible"};
            instrumento.resultadoMetas = {nivel:"No Disponible"};
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

    async getPromedioGeneral({request,response}){
        var id = request.input("hostname");
        var idOpinante = request.input("idOpinante");
        var codigo = request.input("codigoActor");
        
        const cliente =request.input('cliente') ;

        const query =`call ede_getPromedioGeneral('${idOpinante}','${codigo}')`;
        
        var salida = [];

        console.log(query);
        const rQuery   = await data.execQuery(cliente,query);

        const competencias = Enumerable.from(rQuery[0][0]).distinct("$.idCompetencia").select(function(c){
            return{
                id: c.idCompetencia,
                competencia: c.competencia,
                nivelAuto: c.nivelAuto,
                nivelSup: c.nivelSup,
                codigoActor:c.codigoActor// ,
                //estaSeleccionada: c.estaSeleccionada
            }
        }).toArray()

        const competencias2 = Enumerable.from(rQuery[0][0]).where(`$.estaSeleccionada == "0"`).distinct("$.idCompetencia").select(function(c){
            return{
                id: c.idCompetencia,
                competencia: c.competencia,
                nivel: c.nivel,
                estaSeleccionada: c.estaSeleccionada
            }
        }).toArray()

        var idComp = 0;
        competencias2.forEach(e => {
            idComp = e.id;
            competencias.forEach(e2 => {
                if(idComp != e2.id)
                {
                    console.log(idComp)
                }
            });
            console.log(idComp)
        });
        salida = competencias.concat(competencias2);
        
        response.json(competencias); 
    }
}

module.exports = Instrumento