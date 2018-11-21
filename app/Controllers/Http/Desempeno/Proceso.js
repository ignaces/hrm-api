'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Proceso {

    async getTipoProceso({request,response}){
       
        var idTipoProceso=request.input('idTipoProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getTipoProceso('${idTipoProceso}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }


    async addProceso({request,response}){
      
        var nombre = request.input('nombre');
        var idTipoProceso = request.input('idTipoProceso');
        var idCompetenciaModelo = request.input('idCompetenciaModelo');
        var imagen = request.input('imagen');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var idEstado = request.input('idEstado');
        const cliente =request.input('cliente') ;
        const query =  `call ede_addProceso('${nombre}','${idTipoProceso}','${idCompetenciaModelo}','${imagen}','${fecha_inicio}','${fecha_termino}','${idEstado}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta
        });
    }


    async updProceso({request,response}){
      
        var idProceso= request.input('idProceso');
        var nombre= request.input('nombre');
        var idTipoProceso = request.input('idTipoProceso');
        var idCompetenciaModelo = request.input('idCompetenciaModelo');
        var imagen = request.input('imagen');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updProceso('${idProceso}','${nombre}','${idTipoProceso}','${idCompetenciaModelo}','${imagen}','${fecha_inicio}','${fecha_termino}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }


    async getProcesos({request,response}){
      
        var idProceso = request.input('idProceso');
        var idEstado = request.input('idEstado');
        const cliente =request.input('cliente') ;
        const query =  `call ede_getProcesos('${idProceso}','${idEstado}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getDocumentosProceso({request,response}){
      
        var idProceso = request.input('idProceso');
        const cliente = request.input('cliente') ;
        const query =  `call ede_getDocumentosProceso('${idProceso}')`;
        const respuesta   = await data.execQuery(cliente,query);
       
        const docs = Enumerable.from(respuesta[0][0]).distinct("$.idCategoria").select(function(categoria){
                 
            return{
                    idCategoria:categoria.idCategoria,
                    categoria:categoria.categoria,
                    documentos:Enumerable.from(respuesta[0][0]).where(`$.idCategoria == "${categoria.idCategoria}"`).select(function(doc){
                        return{
                            id:doc.idProceso,
                            nombre:doc.nombre,
                            tipo:doc.tipo,
                            url:doc.url,
                            dt_cre:doc.dt_cre
                        }
                    }).toArray()
                }
            }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": docs
        });
    }

    async addEtapa({request,response}){
      
        var idProceso= request.input('idProceso');
        var nombre= request.input('nombre');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var imagen = request.input('imagen');
        var color = request.input('color');
        var orden = request.input('orden');
        var ocultar = request.input('ocultar');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addEtapa('${idProceso}','${nombre}','${fecha_inicio}','${fecha_termino}','${imagen}','${color}','${orden}','${ocultar}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async updEtapa({request,response}){
      
        var idEtapa= request.input('idEtapa');
        var idProceso= request.input('idProceso');
        var nombre= request.input('nombre');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var imagen = request.input('imagen');
        var color = request.input('color');
        var orden = request.input('orden');
        var ocultar = request.input('ocultar');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updEtapa('${idEtapa}','${idProceso}','${nombre}','${fecha_inicio}','${fecha_termino}','${imagen}','${color}','${orden}','${ocultar}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
           }
           catch(err)
           { 
            response.json({mensaje:err});
          }
    }

    async getEtapas({request,response}){
       
        var idProceso=request.input('idProceso')
        var idEtapa=request.input('idEtapa')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEtapas('${idProceso}','${idEtapa}')`;
        const respuesta   = await data.execQuery(cliente,query);
        //console.log(respuesta)
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }


    async getTareas({request,response}){
        
        var idTarea=request.input('idTarea')
        var codigoTipoProceso=request.input('codigoTipoProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getTareas('${idTarea}','${codigoTipoProceso}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async addTareaEtapa({request,response}){
    
        var idEtapa= request.input('idEtapa');
        var idTarea= request.input('idTarea');
        var nombre= request.input('nombre');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var imagen = request.input('imagen');
        var color = request.input('color');
        var orden = request.input('orden');
        var ocultar = request.input('ocultar');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addTareaEtapa('${idEtapa}','${idTarea}','${nombre}','${fecha_inicio}','${fecha_termino}','${imagen}','${color}','${orden}','${ocultar}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
            }
            catch(err)
            { 
            response.json({mensaje:err});
            }
    }

    async updTareaEtapa({request,response}){
    
        var idEtapaTarea= request.input('idEtapaTarea');
        var idEtapa= request.input('idEtapa');
        var idTarea= request.input('idTarea');
        var nombre= request.input('nombre');
        var fecha_inicio = request.input('fecha_inicio');
        var fecha_termino = request.input('fecha_termino');
        var imagen = request.input('imagen');
        var color = request.input('color');
        var orden = request.input('orden');
        var ocultar = request.input('ocultar');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updTareaEtapa('${idEtapaTarea}','${idEtapa}','${idTarea}','${nombre}','${fecha_inicio}','${fecha_termino}','${imagen}','${color}','${orden}','${ocultar}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
            }
            catch(err)
            { 
            response.json({mensaje:err});
            }
    }

    async getAccionesTarea({request,response}){

        var idEtapaTarea=request.input('idEtapaTarea')
        var idAccionTarea=request.input('idAccionTarea')
        var idAccion=request.input('idAccion')
        var idActor=request.input('idActor')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getAccionesTarea('${idEtapaTarea}','${idAccionTarea}','${idAccion}','${idActor}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getAcciones({request,response}){
        var idAccion=request.input('idAccion')
        var idTarea=request.input('idTarea')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getAcciones('${idAccion}','${idTarea}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getActores({request,response}){
        var idActor=request.input('idActor')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getActores('${idActor}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async addAccionTarea({request,response}){
    
        var idEtapaTarea= request.input('idEtapaTarea');
        var idAccion= request.input('idAccion');
        var idActor= request.input('idActor');
        var instruccion = request.input('instruccion');
        var esFin = request.input('esFin');
        var orden = request.input('orden');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_addAccionTarea('${idEtapaTarea}','${idAccion}','${idActor}','${instruccion}','${esFin}','${orden}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
            }
            catch(err)
            { 
            response.json({mensaje:err});
            }
    }

    async updAccionTarea({request,response}){
    
        var idAccionTarea= request.input('idAccionTarea');
        var idEtapaTarea= request.input('idEtapaTarea');
        var idAccion= request.input('idAccion');
        var idActor= request.input('idActor');
        var instruccion = request.input('instruccion');
        var esFin = request.input('esFin');
        var orden = request.input('orden');
        var idEstado = request.input('idEstado');
        var cliente = request.input('cliente');
        try{
            const query =  `call ede_updAccionTarea('${idAccionTarea}','${idEtapaTarea}','${idAccion}','${idActor}','${instruccion}','${esFin}','${orden}','${idEstado}')`;
            const respuesta   = await data.execQuery(cliente,query);
            response.json({mensaje:"OK"});
            }
            catch(err)
            { 
            response.json({mensaje:err});
            }
    }
    
    async getInformeComparativo({request,response}){
        var idPersona=request.input('idPersona')

        //var idPersona= '4b812c9f-df3b-44f8-a7d1-842661d9eae7'

        //var idPersona= 'e5429228-7efd-11e8-80db-bc764e10787e';

        const cliente =request.input('cliente') ;
        const query =  `call ede_getInformeComparativo('${idPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        var registros = respuesta[0][0];

        var evaluaciones = Enumerable.from(registros).distinct("$.dimension").select(function(evaluacion){
            return {
                idEvaluado:evaluacion.idEvaluado,
                conducta:evaluacion.dimensionNombre,
                codconducta:evaluacion.dimension,
                cuentaAngulos:0,
                angulos:Enumerable.from(registros).distinct("$.Angulo").select(function(angulo){
                    return {
                        tipo:angulo.Angulo,
                        feedback:[]
                    }
                }).toArray(),
            }
        }).toArray();

        for(var evaluado in evaluaciones){
            var vlEvaluado = evaluaciones[evaluado];    

            for(var angulo in vlEvaluado.angulos){
                var vlAngulo = vlEvaluado.angulos[angulo];

                var vlfeedback = Enumerable.from(registros).where(`$.Angulo == "${vlAngulo.tipo}" && $.dimension == "${vlEvaluado.codconducta}"`).select(function(feed){
                    return {
                        Evaluador:feed.Evaluador,
                        estado:feed.EstadoEncuesta,
                        enunciado:feed.enunciado,
                        respuesta:feed.textoAlternativa,
                        alternativas:Enumerable.from(registros).distinct("$.textoAlternativa").select(function(alt){
                            return {
                                alternativa:alt.textoAlternativa
                            }
                        }).toArray()
                    }
                }).toArray()

                if (vlAngulo.tipo == 'MI EQUIPO' && vlfeedback.length > 0) {

                    var resp=[];
                    var arr=[];
                    var a="";

                    for(var fee in vlfeedback){
                        if(vlfeedback[fee].respuesta !== null) {
                            a = vlfeedback[fee].enunciado + "_" + vlfeedback[fee].respuesta;
                            arr.push(a);
                        }
                    }

                    const counts = Object.create(null);
                    for (const a of arr) {
                        const [aa, bb] = a.split('_');
                        if (!counts[aa]) counts[aa] = Object.create(null);
                        counts[aa][bb] = counts[aa][bb] ? counts[aa][bb] + 1 : 1;
                    }

                    for (const a of Object.keys(counts)) {
                        var c = counts[a];
                        var y = [];
                        var z = [];
                        for (const x in c){
                            var w = c[x];

                            z.push(w);
                            y[w] = x;
                        }

                        z.sort(function(a, b){return b-a});
                        //console.log(z)
                        //console.log(y)

                        resp[a] = y[z[0]];
                    }

                    //console.log(resp)
                   
                    var vlfeedbackB = Enumerable.from(vlfeedback).distinct("$.enunciado").select(function(vlfeed){
                        return {
                            Evaluador:vlfeed.Evaluador,
                            estado:vlfeed.estado,
                            enunciado:vlfeed.enunciado,
                            respuesta:resp[vlfeed.enunciado],
                            alternativas:vlfeed.alternativas
                        }
                    }).toArray();

                    vlfeedback = vlfeedbackB;
                }

                evaluaciones[evaluado].angulos[angulo].feedback=vlfeedback;
            }      
        }
        
        var i = 0;
        for(var evaluado in evaluaciones){
            i = 0;
            for(var angulo in evaluaciones[evaluado].angulos){
                i++;            
            }
            evaluaciones[evaluado].cuentaAngulos=i + 1;
        }

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": evaluaciones
        });
    }

    async getMenuUsuario({request,response}){
        var idProceso=request.input('idProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getMenuUsuario('${idProceso}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    
    async getProcesoPersona({request,response}){
        var idProceso=request.input('idProceso')
        var idPersona=request.input('idPersona')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getProcesoPersona('${idProceso}','${idPersona}')`;

        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }
    async getProcesosPersona({request,response}){
        var idPersona=request.input('idPersona')
        var idEstado=request.input('idEstado')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getProcesosPersona('${idPersona}','${idEstado}')`;

        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getTareasEtapas({request,response}){
        var idEtapa=request.input('idEtapa')
        var idTareaEtapa=request.input('idTareaEtapa')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getTareasEtapas('${idEtapa}','${idTareaEtapa}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getListaEvaluados({request,response}){
        var idEtapa=request.input('idEtapa')
        var idPersonaActor=request.input('idPersonaActor')
        var codigoActor=request.input('codigoActor')
        var idAccionPersona=request.input('idAccionPersona')
        const cliente =request.input('cliente') ;
        /*console.log ("idEtapa " + idEtapa)
        console.log ("idPErsonaActor " + idPersonaActor)
        console.log ("codigoActor " + codigoActor)
        console.log (" idAccionPersona " + idAccionPersona)
        console.log ("cliente " + cliente)*/
        const query =  `call ede_getListaEvaluados('${idEtapa}','${idPersonaActor}','${codigoActor}','${idAccionPersona}')`;
        console.log (query)
        const respuesta   = await data.execQuery(cliente,query);
        
        const evaluados = Enumerable.from(respuesta[0][0]).distinct("$.idEvaluado").select(function(evaluado){
       
            return{
                    idEvaluado:evaluado.idEvaluado,
                    idProceso:evaluado.idProceso,
                    idPersona:evaluado.evaluado_idPersona,
                    idCompetenciaPerfil:evaluado.evaluado_idCompetenciaPerfil,
                    idEdeMetaPerfil:evaluado.evaluado_idMetaPerfil,
                    activoEdeProcesoPersona:evaluado.evaluado_activoProceso,
                    nombres:evaluado.evaluado_nombres,
                    apellidoPaterno:evaluado.evaluado_apellidoPaterno,
                    apellidoMaterno:evaluado.evaluado_apellidoMaterno,
                    foto:evaluado.evaluado_foto,
                    codigoGenero:evaluado.evaluado_codigoGenero,
                    nombreCargo:evaluado.evaluado_nombreCargo,
                    PerfilCompetencias:evaluado.evaluado_perfilCompetencias,
                    PerfilMetas:evaluado.evaluado_perfilMetas,
                    estadoEdeProcesoPersona:evaluado.evaluado_nombreEstadoProceso,
                    tareas:[]

                }
            }).toArray();

            for(var evaluado in evaluados){
                
                const tareas = Enumerable.from(respuesta[0][0]).where(`$.idEvaluado == "${evaluados[evaluado].idEvaluado}"`).select(function(tarea){
                    return{
                        tarea
                    }
                }).toArray();

                //console.log(tareas)
                evaluados[evaluado].tareas=tareas;
               
            }

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": evaluados
        });
    }

    async updateCalibracion({request,response}){
        var idEdeEtapaTareaActor=request.input('idEdeEtapaTareaActor');
        var calibracion=request.input('calibracion');
        const cliente =request.input('cliente') ;

        const query =  `call ede_updateCalibracion('${idEdeEtapaTareaActor}','${calibracion}')`;
        const respuesta   = await data.execQuery(cliente,query);
    }

    async getListaCalibracion({request,response}){
        var idEtapa=request.input('idEtapa')
        var idPersonaActor=request.input('idPersonaActor')
        var codigoActor=request.input('codigoActor')
        var idAccionPersona=request.input('idAccionPersona')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getListaCalibracion('${idEtapa}','${idPersonaActor}','${codigoActor}','${idAccionPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        const evaluados = Enumerable.from(respuesta[0][0]).distinct("$.idEvaluado").select(function(evaluado){
            return{
                    idEvaluado:evaluado.idEvaluado,
                    idProceso:evaluado.idProceso,
                    idPersona:evaluado.evaluado_idPersona,
                    idCompetenciaPerfil:evaluado.evaluado_idCompetenciaPerfil,
                    idEdeMetaPerfil:evaluado.evaluado_idMetaPerfil,
                    activoEdeProcesoPersona:evaluado.evaluado_activoProceso,
                    nombres:evaluado.q,
                    idOpinante:evaluado.evaluado_idOpinante,
                    apellidoPaterno:evaluado.evaluado_apellidoPaterno,
                    apellidoMaterno:evaluado.evaluado_apellidoMaterno,
                    foto:evaluado.evaluado_foto,
                    codigoGenero:evaluado.evaluado_codigoGenero,
                    nombreCargo:evaluado.evaluado_nombreCargo,
                    PerfilCompetencias:evaluado.evaluado_perfilCompetencias,
                    PerfilMetas:evaluado.evaluado_perfilMetas,
                    estadoEdeProcesoPersona:evaluado.evaluado_nombreEstadoProceso,
                    resultadoCalibracion: evaluado.resultadoCalibracion,
                    tareas:[]

                }
            }).toArray();

            var matrizEval = {
                "AA":0,
                "AB":0,
                "AC":0,
                "BA":0,
                "BB":0,
                "BC":0,
                "CA":0,
                "CB":0,
                "CC":0,
                "sum":0,
                "Sesp":0,
                "esp":0,
                "Besp":0
            }

            var matrizCalib = {
                "AA":0,
                "AB":0,
                "AC":0,
                "BA":0,
                "BB":0,
                "BC":0,
                "CA":0,
                "CB":0,
                "CC":0,
                "sum":0,
                "Sesp":0,
                "esp":0,
                "Besp":0
            }

            for(var evaluado in evaluados){
                
                const tareas = Enumerable.from(respuesta[0][0]).where(`$.idEvaluado == "${evaluados[evaluado].idEvaluado}"`).select(function(tarea){
                    return{
                        tarea
                    }
                }).toArray();

                //console.log(tareas)
                evaluados[evaluado].tareas=tareas;
                var idOpinante = evaluados[evaluado].idOpinante;
                console.log(evaluados[evaluado]);
                const queryResultado = `call ede_calculaEvaluacion('${idOpinante}')`;
                console.log('idOpinante:'+idOpinante);
            
                var resultadoGlobal = evaluados[evaluado].tareas[0].tarea.resultadoEvaluacion;
                var resultadoCalibracion = evaluados[evaluado].tareas[0].tarea.resultadoCalibracion;
                console.log(JSON.stringify(evaluados[evaluado].resultadoCalibracion));
                
                if(resultadoGlobal == "AA"){
                    matrizEval.AA++;
                    matrizEval.sum++;
                    matrizEval.Sesp++;
                }else if(resultadoGlobal == "AB"){
                    matrizEval.AB++;
                    matrizEval.sum++;
                    matrizEval.Sesp++;
                }else if(resultadoGlobal == "AC"){
                    matrizEval.AC++;
                    matrizEval.sum++;
                    matrizEval.Besp++;
                }else if(resultadoGlobal == "BA"){
                    matrizEval.BA++;
                    matrizEval.sum++;
                    matrizEval.Sesp++;
                }else if(resultadoGlobal == "BB"){
                    matrizEval.BB++;
                    matrizEval.sum++;
                    matrizEval.esp++;
                }else if(resultadoGlobal == "BC"){
                    matrizEval.BC++;
                    matrizEval.sum++;
                    matrizEval.Besp++;
                }else if(resultadoGlobal == "CA"){
                    matrizEval.CA++;
                    matrizEval.sum++;
                    matrizEval.Besp++;
                }else if(resultadoGlobal == "CB"){
                    matrizEval.CB++;
                    matrizEval.sum++;
                    matrizEval.Besp++;
                }else if(resultadoGlobal == "CC"){
                    matrizEval.CC++;
                    matrizEval.sum++;
                    matrizEval.Besp++;
                }
                if(resultadoCalibracion == "AA"){
                    matrizCalib.AA++;
                    matrizCalib.sum++;
                    matrizCalib.Sesp++;
                }else if(resultadoCalibracion == "AB"){
                    matrizCalib.AB++;
                    matrizCalib.sum++;
                    matrizCalib.Sesp++;
                }else if(resultadoCalibracion == "AC"){
                    matrizCalib.AC++;
                    matrizCalib.sum++;
                    matrizCalib.Besp++;
                }else if(resultadoCalibracion == "BA"){
                    matrizCalib.BA++;
                    matrizCalib.sum++;
                    matrizCalib.Sesp++;
                }else if(resultadoCalibracion == "BB"){
                    matrizCalib.BB++;
                    matrizCalib.sum++;
                    matrizCalib.esp++;
                }else if(resultadoCalibracion == "BC"){
                    matrizCalib.BC++;
                    matrizCalib.sum++;
                    matrizCalib.Besp++;
                }else if(resultadoCalibracion == "CA"){
                    matrizCalib.CA++;
                    matrizCalib.sum++;
                    matrizCalib.Besp++;
                }else if(resultadoCalibracion == "CB"){
                    matrizCalib.CB++;
                    matrizCalib.sum++;
                    matrizCalib.Besp++;
                }else if(resultadoCalibracion == "CC"){
                    matrizCalib.CC++;
                    matrizCalib.sum++;
                    matrizCalib.Besp++;
                }
            }
            matrizEval.Besp = (100*matrizEval.Besp)/matrizEval.sum;
            matrizEval.esp = (100*matrizEval.esp)/matrizEval.sum;
            matrizEval.Sesp = (100*matrizEval.Sesp)/matrizEval.sum;

            matrizCalib.Besp = (100*matrizCalib.Besp)/matrizCalib.sum;
            matrizCalib.esp = (100*matrizCalib.esp)/matrizCalib.sum;
            matrizCalib.Sesp = (100*matrizCalib.Sesp)/matrizCalib.sum;
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": evaluados,
            "matrizE": matrizEval,
            "matrizC": matrizCalib
        });
    }

    async getListaEvaluadosGrupalP({request,response}) {
        var idEtapa=request.input('idEtapa')
        var idPersona=request.input('idPersona')
                
        const cliente =request.input('cliente') ;
        const query =  `call encuesta_getInstrumentoxJefe('${idPersona}','SUPE','${idEtapa}')`;

        //console.log(query)

        const respuesta   = await data.execQuery(cliente,query);

        var registros = respuesta [0][0];

        const evaluados = Enumerable.from(registros).distinct("$.idOpinante").select(function(evaluado){
            return {
                idOpinante:evaluado.idOpinante,
                nombres:evaluado.nombres,
                codigoEstado:evaluado.codigoEstado,
                idEncuestaPersona:evaluado.idEncuestaPersona,
                dimension:Enumerable.from(registros).distinct("$.dimension").where(`$.idOpinante=="${evaluado.idOpinante}"`).select(function(dimension){
                    return {
                        nombre:dimension.dimension,
                        cuentaDimensiones:dimension.cuentaDimensiones,
                    }
                }).toArray(), 
                competencias:Enumerable.from(registros).distinct("$.idPregunta").where(`$.idOpinante=="${evaluado.idOpinante}"`).select(function(competencia){
                    return {
                        idOpinante:competencia.idOpinante,
                        idCompetencia:competencia.idPregunta,
                        nombre:competencia.enunciado,
                        idCriterio:competencia.idPregunta,
                        disabled:(competencia.codigoEstado == 'EVALFINALIZADO'),
                        niveles:Enumerable.from(registros).where(`$.idOpinante=="${competencia.idOpinante}" && $.idPregunta=="${competencia.idPregunta}"`).select(function(nivel){
                            return {
                                id:nivel.idAlternativa,
                                nombre:nivel.textoAlternativa,
                                idRespuesta:nivel.idEvaluacionPreguntaAlternativa,
                                selected:false
                            }
                        }).toArray()                
                    }
                }).toArray()
            }
        }).toArray();

        var salida={
            evaluados:evaluados
        }

        /*console.log(evaluados[1].idOpinante + ' ' + evaluados[1].competencias[0].idCompetencia);
        console.log(evaluados[1].competencias[0].niveles);*/

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": salida
        });
    }

    async getListaEvaluadosGrupal({request,response}){

        var idEtapa=request.input('idEtapa')
        var idEvaluador=request.input('idEvaluador')
        var idProceso=request.input('idProceso')

        const cliente =request.input('cliente') ;
        const query =  `call ede_getEvaluacionGrupal('${idEvaluador}','${idEtapa}','${idProceso}')`;
        console.log(query)
        const respuesta   = await data.execQuery(cliente,query);
        const relacionesCompetencia = respuesta[0][3];
        const competencias = respuesta[0][2];
        const niveles =  respuesta[0][5];
        const respuestas =  respuesta[0][4];
        var registros = respuesta[0][0];
        
        const evaluados = Enumerable.from(registros).select(function(evaluado){
            
            
            return{
                
                    idOpinante:evaluado.idOpinante,
                    idProcesoPersona:evaluado.idProcesoPersona,
                    idPersona:evaluado.idPersona,
                    nombres:evaluado.nombres,
                    observacion:evaluado.observacion,
                    estado:evaluado.estado,
                    codigoEstado:evaluado.codigoEstado,
                    competencias:Enumerable.from(relacionesCompetencia).where(`$.idOpinante=="${evaluado.idOpinante}"`).select(function(competencia){
                        

                        return{
                                idOpinante:competencia.idOpinante,
                                idCompetencia:competencia.idCompetencia,
                                idActividadClave:competencia.idActividadClave,
                                idCriterio:competencia.idCriterio,
                                disabled:false,
                                niveles:Enumerable.from(niveles).where(`$.idOpinante=="${evaluado.idOpinante}" && $.idCompetencia=="${competencia.idCompetencia}"`).select(function(nivel){
                                    return {
                                        id:nivel.idNivel,
                                        valor:nivel.valor,
                                        nombre:nivel.nivel,
                                        selected:Enumerable.from(respuestas).where(`$.idPersona=="${evaluado.idPersona}" && $.idEscalaNivel!=null && $.idOpinante=="${evaluado.idOpinante}" && $.idCriterio=="${competencia.idCriterio}"`).select(function(seleccionado){
                                            
                                            
                                            if(nivel.idNivel==seleccionado.idEscalaNivel){
                                                return true;
                                            }else{
                                                return false;
                                            }
                                            
                                        }).toArray()[0]
                                    }
                                }).toArray()
                        }
                    }).toArray()

                }
            }).toArray();
        
        
            
            for(var e in evaluados){
               var comps=[];
               for(var c in competencias){
                    var competencia = {
                        idOpinante:'',
                        idCompetencia:'',
                        idActividadClave:'',
                        idCriterio:'',
                        disabled:true
                    }
                    var iteracionComp = competencias[c];
                    
                    for(var ec in evaluados[e].competencias){
                        var eComp = evaluados[e].competencias[ec];
                       
                        if(eComp.idCompetencia==iteracionComp.idCompetencia){
                            competencia = eComp;
                            
                        }
                        
                
                    }
                    
                    comps.push(competencia)
                }
                
                evaluados[e].competencias=comps;
                
                const queryResultado = `call ede_calculaEvaluacion('${evaluados[e].idOpinante}')`;
                    
                const resultado  =  await data.execQuery(cliente,queryResultado);
                
                var resultados={}
                resultados.competencias={nivel:"No Disponible"};
                resultados.metas = {nivel:"No Disponible"};
                resultados.global = {nivel:"No Disponible"};
                if(resultado[0][0][0]!=null){
                    resultados.competencias = resultado[0][0][0];
                }
                if(resultado[0][1][0]!=null){
                    resultados.metas = resultado[0][1][0];
                }
                if(resultados.metas.nivel!="No Disponible" && resultados.competencias.nivel!="No Disponible"){
                    resultados.global = {nivel:`${resultados.competencias.nivel}${resultados.metas.nivel}`};
                }
                evaluados[e].resultado=resultados;
            }
        
        var salida={
            competencias:competencias,
            evaluados:evaluados
        }
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": salida
        });
    }

    async getEstadosEde({request,response}){
       
        var nombreTipo=request.input('nombreTipo')
        var activoEstado=request.input('activoEstado')
        var activoTipoEstado=request.input('activoTipoEstado')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEstadosEde('${nombreTipo}','${activoEstado}','${activoTipoEstado}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getModelosCompetencia({request,response}){
       
        var idModelo=request.input('idModelo')
        const cliente =request.input('cliente') ;
        const query =  `call comp_getModelos('${idModelo}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

/* OLDER */

    async getEtapasProceso({request,response}){
       
        var idProceso=request.input('idProceso')
        var idProcesoEtapa=request.input('idProcesoEtapa')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEtapasProceso('${idProceso}','${idProcesoEtapa}')`;
        const respuesta   = await data.execQuery(cliente,query);
     
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getCuentaEstados({request,response}){
        var idProcesoEtapa=request.input('idProcesoEtapa')
        var idPersonaSuperior=request.input('idPersonaSuperior')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getCuentaEstados('${idProcesoEtapa}','${idPersonaSuperior}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getEmailPorIdMatriz({request,response}){
       
        var idEdeEtapaTareaAccionProcesoPersona=request.input('idEdeEtapaTareaAccionProcesoPersona')        
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEmailPorIdMatriz('${idEdeEtapaTareaAccionProcesoPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getEmailJefeEvaluado({request,response}){
       
        var idEdeEtapaTareaAccionProcesoPersona=request.input('idEdeEtapaTareaAccionProcesoPersona')        
        const cliente =request.input('cliente') ;
        const query =  `call ede_getEmailJefeEvaluado('${idEdeEtapaTareaAccionProcesoPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async putRespuesta({request,response}){
       
        var idOpinante = request.input("idOpinante");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");
        const cliente =request.input('cliente') ;
        const query = `call ede_putRespuesta('${idOpinante}', '${idPregunta}','${idAlternativa}', '${justificacion}')`;
        const result   = await data.execQuery(cliente,query);
        const queryResultado = `call ede_calculaEvaluacion('${idOpinante}')`;
                    
        const resultado  =  await data.execQuery(cliente,queryResultado);
        
        var resultados={}
        resultados.competencias={nivel:"No Disponible"};
        resultados.metas = {nivel:"No Disponible"};
        resultados.global = {nivel:"No Disponible"};
        if(resultado[0][0][0]!=null){
            resultados.competencias = resultado[0][0][0];
        }
        if(resultado[0][1][0]!=null){
            resultados.metas = resultado[0][1][0];
        }
        if(resultados.metas.nivel!="No Disponible" && resultados.competencias.nivel!="No Disponible"){
            resultados.global = {nivel:`${resultados.competencias.nivel}${resultados.metas.nivel}`};
        }
        
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          },
          data:{resultados:resultados}
          
        }
        response.json(body);
    }

    async getMensaje({request,response}){
      
        try {
            var idProceso=request.input('idProceso')
            const cliente =request.input('cliente') ;
            const query =`call ede_getMensajeProceso('${idProceso}')`;
            
            const respuesta   = await data.execQuery(cliente,query);
            console.log(respuesta)
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch (e) {
            console.log(e);
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }

    async getSysParametros({request,response}){
      
        try {
            var idEtapa=request.input('idEtapa')
            const cliente =request.input('cliente') ;
            const query =`call ede_getSysParametros('${idEtapa}')`;
            
            const respuesta   = await data.execQuery(cliente,query);
            //console.log(respuesta)
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch (e) {
            console.log(e);
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }

    async updEncuesta({request,response}){
      
        var idEncuestaPersona = request.input("idEncuestaPersona")
        const cliente =request.input('cliente') ;
        var codigoEstado = request.input("codigoEstado")
        var idProceso = request.input("idProceso")
        var codigoActor = request.input("codigoActor")
        console.log("updEncuesta")

        try{
            const query =  `call ede_updEstadoEncuestaEDE('${idEncuestaPersona}','${codigoEstado}','${idProceso}','${codigoActor}')`;
            console.log(query)
            const respuesta   = await data.execQuery(cliente,query);
            //response.json({mensaje:"OK"});
            console.log("OK")
           }
           catch(err)
           { 
            //response.json({mensaje:err});
            console.log(err)
          }
    }

    async getPersonasProcesos({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');

        const query       =  `call pers_listarPersonasProcesoDesempeno('${idProceso}')`;
        const respuesta   =  await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getDatosPersonaProceso({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idPersona   =   request.input('idPersona');
        var tipo        =   request.input('tipo');

        const query       =  `call pers_getReporteAvanceEde('${idProceso}','${idPersona}','${tipo}');`;
        console.log(query);
        const respuesta   =  await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async cambiaEstadoEvaluacion({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idEvaluacion   =   request.input('idEvaluacion');
        
        const query       =  `call pers_updEstadoEvaluacionEde('${idEvaluacion}','${idProceso}');`;
        //console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getClasificaciones({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        
        const query       =  `call pers_getClasificacionesEde('${idProceso}');`;
        console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        //console.log(respuesta);
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "padres": respuesta[0][0],
            "hijos": respuesta[0][1]
            
        });
    }

    async getClasificacionesPersona({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idPersona   =   request.input('idPersona');
        
        const query       =  `call pers_getClasificacionesPersonaEde('${idPersona}','${idProceso}');`;
        //console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        console.log(respuesta[0][0]);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
            
        });
    }

    async getPersonasEvaluadoras({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idPersona   =   request.input('idPersona');
        
        const query       =  `call pers_getPersonasSelEvaluador('${idPersona}','${idProceso}');`;
        //console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        //console.log(respuesta[0][0]);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
            
        });
    }

    async updEvaluador({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idEvaluacion =   request.input('idEvaluacion');
        var idEaluador   =   request.input('idEvaluador');
        var idTareaActor = request.input('idTareaActor');

        const query       =  `call pers_updEvaluador('${idTareaActor}', '${idEvaluacion}', '${idEaluador}','${idProceso}');`;
        //console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        //console.log(respuesta[0][0]);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
            
        });
    }

    async getSabanaAvance({request,response}){
       
        const cliente   =   request.input('cliente');
        var idProceso   =   request.input('idProceso');
        var idEvaluador   =   request.input('idEvaluador');
        //console.log(`call pers_getReporteAvanceEdeSabana('${idProceso}', '${idEvaluador}');`);
        //return false;
        const query       =  `call pers_getReporteAvanceEdeSabana('${idProceso}', '${idEvaluador}');`;
        console.log(query);
        //return false;
        const respuesta   =  await data.execQuery(cliente,query);
        //console.log(respuesta[0][0]);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
            
        });
    }

    
}
module.exports=Proceso