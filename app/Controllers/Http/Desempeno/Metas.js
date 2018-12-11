'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Metas {

    async getDataPersonasCreacionMetas({request,response}){
        var idProcesoEtapa=request.input('idProcesoEtapa')
        var idPersona=request.input('idPersona')
        var idPersonaSuperior=request.input('idPersonaSuperior')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getDataPersonasCreacionMetas('${idProcesoEtapa}','${idPersona}','${idPersonaSuperior}')`;
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
    async saveCumplimiento({request,response}){
        var idMeta= request.input("idMeta");
        var valor= request.input("valor");
        var idOpinante= request.input("idOpinante");
        const cliente =request.input('cliente') ;
        const query =  `call ede_saveCumplimiento('${idMeta}',${valor})`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        const queryEstado = `call ede_saveEstadoEvaluacionMetas('${idOpinante}', 'EVALMETAENPROCESO')`;

        const result   = await data.execQuery(cliente,queryEstado);
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }


    async getMetasColaborador({request,response}){
        var idProceso=request.input('idProceso')
        var idPerfilMeta=request.input('idPerfilMeta')
        var idProcesoPersona=request.input('idProcesoPersona')
        var eliminada=request.input('eliminada')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getMetasColaborador('${idProceso}','${idPerfilMeta}','${idProcesoPersona}','${eliminada}')`;
      
        const respuesta   = await data.execQuery(cliente,query);
                   
       
        const dimensiones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function(dimension){
       
            return{
                    id:dimension.id,
                    nombre:dimension.nombre,
                    ponderacionTotal:dimension.ponderacionTotal,
                    numeroMinimo:dimension.numeroMinimo,
                    numeroMaximo:dimension.numeroMaximo,
                    ponderacionMinima:dimension.ponderacionMinima,
                    ponderacionMaxima:dimension.ponderacionMaxima,
                    numeroMetas:dimension.numeroMetas,
                    ponderacionMetas:dimension.ponderacionMetas,
                    resPonderacionColor:dimension.resPonderacionColor,
                    resPonderacionIcono:dimension.resPonderacionIcono,
                    resNumeroColor:dimension.resNumeroColor,
                    resNumeroIcono:dimension.resNumeroIcono,
                    metas:[]

                }
            }).toArray();

            for(var dimension in dimensiones){
                
                const metas = Enumerable.from(respuesta[0][0]).where(`$.id == "${dimensiones[dimension].id}"`).select(function(meta){
                    
                    return{
                        
                        meta
                    }
                }).toArray();


              dimensiones[dimension].metas=metas;
               
            }
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": dimensiones
            });
                  
        //response.json(dimensiones);
    }

    async getMetasColumnas({request,response}){
        var idProceso=request.input('idProceso')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getMetasColumnas('${idProceso}')`;

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

    async getUnaMetaColaborador({request,response}){
        var idProceso=request.input('idProceso')
        var idProcesoEtapa=request.input('idProcesoEtapa')
        var idPerfilMeta=request.input('idPerfilMeta')
        var idProcesoPersona=request.input('idProcesoPersona')
        var idMeta=request.input('idMeta')
        const cliente =request.input('cliente') ;
        const query =  `call ede_getUnaMetaColaborador('${idProceso}','${idProcesoEtapa}','${idPerfilMeta}','${idProcesoPersona}','${idMeta}')`;
        const respuesta   = await data.execQuery(cliente,query);
                   
        const metas = Enumerable.from(respuesta[0][0]).distinct("$.idMeta").select(function(meta){
       
            return{
                    /*id:dimension.id,
                    nombre:dimension.nombre,
                    ponderacionTotal:dimension.ponderacionTotal,
                    numeroMinimo:dimension.numeroMinimo,
                    numeroMaximo:dimension.numeroMaximo,
                    ponderacionMinima:dimension.ponderacionMinima,
                    ponderacionMaxima:dimension.ponderacionMaxima,
                    numeroMetas:dimension.numeroMetas,
                    ponderacionMetas:dimension.ponderacionMetas,
                    resPonderacionColor:dimension.resPonderacionColor,
                    resPonderacionIcono:dimension.resPonderacionIcono,
                    resNumeroColor:dimension.resNumeroColor,
                    resNumeroIcono:dimension.resNumeroIcono,
                    metas:[]*/
                    meta

                }
            }).toArray();

           /* for(var dimension in dimensiones){
                
                const metas = Enumerable.from(respuesta[0][0]).where(`$.id == "${dimensiones[dimension].id}"`).select(function(meta){
                    return{
                        meta
                    }
                }).toArray();


              dimensiones[dimension].metas=metas;
               
            }*/
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": metas
            });
                  
        //response.json(dimensiones);
    }
    async finalizar({request, response}){
        try{
            var idOpinante = request.input('idOpinante')
            
    
            const cliente =request.input('cliente') ;
        
            const query = `call ede_saveEstadoEvaluacionMetas('${idOpinante}', 'EVALMETAFINALIZADO')`;

            const result   = await data.execQuery(cliente,query);
            
            const body = 
            {
            estado: {
                codigo: "OK",
                mensaje: ""
            }
            
            }
            response.json(body);

        }catch(ex){
            console.log(ex)
        }
        
    }
    async putRespuesta({request,response}){

        var idOpinante = request.input("idOpinante");
        var idMeta = request.input("idMeta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");
        
        const cliente =request.input('cliente') ;
        
        const query = `call ede_putRespuestaMeta('${idMeta}', '${idAlternativa}', '${justificacion}', '${idOpinante}')`;

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

module.exports=Metas