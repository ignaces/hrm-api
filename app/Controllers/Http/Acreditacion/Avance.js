const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')

class Avance {

    async getAvanceClasificaciones({request,response}){
        var idProceso = request.input("idProceso")
        const cliente =request.input('cliente') ;
        const query = `call acre_getAvanceClasificaciones('${idProceso}')`;
        const result   = await data.execQuery(cliente,query);

        console.log(result);

        const clasificaciones = Enumerable.from(result[0][0]).distinct("$.idClasificacion").select(function(clasificacion){
            return{
                id:clasificacion.idClasificacion,
                nombre:clasificacion.nombreClasificacion,
                niveles:Enumerable.from(result[0][0]).where(`$.idClasificacion == "${clasificacion.idClasificacion}"`).distinct("$.idNivel").select(function(nivel){
                    return{
                        id:nivel.idNivel,
                        nombre:nivel.nivelClasificacion,
                        estados:Enumerable.from(result[0][0]).where(`$.idNivel == "${nivel.idNivel}"`).select(function(estado){
                            return{
                                codigo:estado.codigoEstado,
                                nombre:estado.nombreEstado,
                                texto:estado.estadoEncuesta,
                                color:estado.color,
                                icono:estado.icono,
                                porcentaje:estado.porcentaje,
                                cantidad:estado.cantidad
                            }
                        }).toArray()
                    }
                }).toArray()
            }
        }).toArray();
        response.json(clasificaciones);   
    }
}

module.exports = Avance
