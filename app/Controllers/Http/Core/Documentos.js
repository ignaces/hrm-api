'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Documentos {

    // --->> TRAER DOCUMENTOS

    async getDocumentos({request,response}){
       
        var activo=request.input('activo');
        const cliente =request.input('cliente') ;
        const query =  `call getDocumentos('${activo}')`;
        const respuesta   = await data.execQuery(cliente,query);
        const docs = Enumerable.from(respuesta[0][0]).distinct("$.idCategoria").select(function(categoria){
       
            return{
                    idCategoria:categoria.id,
                    categoria:categoria.categoria,
                    documentos:Enumerable.from(respuesta[0][0]).where(`$.idCategoria == "${categoria.idCategoria}"`).select(function(doc){
                        return{
                            id:doc.id,
                            nombre:doc.nombre,
                            tipo:doc.tipo,
                            url:doc.url,
                            activo:doc.activo,
                            dt_cre:doc.dt_cre,
                            dt_mod:doc.dt_mod
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


}

module.exports=Documentos