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
        console.log(respuesta)
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
        console.log ("idEtapa " + idEtapa)
        console.log ("idPErsonaActor " + idPersonaActor)
        console.log ("codigoActor " + codigoActor)
        console.log (" idAccionPersona " + idAccionPersona)
        console.log ("cliente " + cliente)
        const query =  `call ede_getListaEvaluados('${idEtapa}','${idPersonaActor}','${codigoActor}','${idAccionPersona}')`;
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

    async putRespuesta({request,response}){
       
        var idOpinante = request.input("idOpinante");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");
        const cliente =request.input('cliente') ;
        const query = `call ede_putRespuesta('${idOpinante}', '${idPregunta}','${idAlternativa}', '${justificacion}')`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);
    }
}
module.exports=Proceso