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
                resultados:Enumerable.from(result[0][0]).where(`$.id == "${resultado.id}" && $.total > 0`).select(function(serv){
                    return {
                        pregunta:serv.pregunta,
                        mayor5:serv.mayor5,
                        menor5:serv.menor5,
                        total:serv.total
                    }
                }).toArray()
            }
        }).toArray();

        return {mensaje:evaluacion};

    }

    async getEncuestasServiciosGraf({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getEncuestasServicios('${idEciProcesoCenco}')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        var clasificaciones = Enumerable.from(result[0][0]).distinct("$.id").select(function (resultado) {
            return {
                id:resultado.id,
                nombre:resultado.nombre,
                estados:Enumerable.from(result[0][0]).where(`$.id == "${resultado.id}" && $.total > 0`).select(function(serv){
                    return {
                        nombre:serv.pregunta,
                        data:[serv.mayor5,serv.menor5,serv.total]
                    }
                }).toArray()
            }
        }).toArray();

        for(var i in clasificaciones){
            var estados = clasificaciones[i].estados;
            var vmayor5 = [];
            var vmenor5 = [];
            var vtotal = [];
            var vpregunta = [];

            for(var e in estados){
                vpregunta.push(estados[e].nombre);
                vmayor5.push(estados[e].data[0]);
                vmenor5.push(estados[e].data[1]);
                vtotal.push(estados[e].data[2]);
            }

            clasificaciones[i].estados = [];
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Respuestas (7 y 6)",
                data:vmayor5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Respuestas (4 ... 1)",
                data:vmenor5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Total",
                data:vtotal
            });

        }

        return {mensaje:clasificaciones};

    }

}

module.exports = Informe