'use strict'
const Database = use('Database')
var Enumerable = require('linq')
const data = use('App/Utils/Data')

class Informe {

    async getCencosProceso({request,response}){
        const idProceso = request.input('idProceso');

        const query =`call eci_getCencosProceso('${idProceso}')`;
        const cliente =request.input('cliente');
        const result   = await data.execQuery(cliente,query);

        response.json({
            "estado": {
                "codigo": "ERROR",
                "mensaje": ""
            },
            "paginacion": "",
            "data": result[0][0]
        });
    }

    async getEncuestasServicios({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getEncuestasServicios('${idEciProcesoCenco}')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        const evaluacion = Enumerable.from(result[0][0]).distinct("$.id").select(function (resultado) {
            return {
                id:resultado.id,
                nServicio:resultado.nombre,
                resultados:Enumerable.from(result[0][0]).where(`$.id == "${resultado.id}"`).select(function(serv){
                    return {
                        pregunta:serv.pregunta,
                        igual7:serv.igual7,
                        igual6:serv.igual6,
                        menor5:serv.menor5,
                        total:serv.total
                    }
                }).toArray()
            }
        }).toArray();

        return {mensaje:evaluacion};

    }

}

module.exports = Informe