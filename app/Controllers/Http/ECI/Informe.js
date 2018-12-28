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
                        igual1:serv.igual1,
                        igual2:serv.igual2,
                        igual3:serv.igual3,
                        igual4:serv.igual4,
                        igual5:serv.igual5,
                        igual6:serv.igual6,
                        igual7:serv.igual7,
                        total:serv.total,
                        SNEx:Math.round(100 *(((serv.igual7 + serv.igual6) - (serv.igual1 + serv.igual2 + serv.igual3 + serv.igual4)) / serv.total) * 100) / 100
                    }
                }).toArray()
            }
        }).toArray();

        return {mensaje:evaluacion};

    }

    async getEncuestasServiciosGraf({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getEncuestasServiciosGraf('${idEciProcesoCenco}')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        var clasificaciones = Enumerable.from(result[0][0]).distinct("$.id").select(function (resultado) {
            return {
                id:resultado.id,
                nombre:resultado.nombre,
                estados:Enumerable.from(result[0][0]).where(`$.id == "${resultado.id}" && $.total > 0`).select(function(serv){
                    return {
                        //nombre:Math.round(100 *(((serv.mayor5) - (serv.menor5)) / serv.total) * 100) / 100,
                        nombre:serv.pregunta,
                        data:[
                            Math.round(100 * ((serv.mayor5 * 100) / serv.total)) / 100,
                            Math.round(100 * ((serv.igual5 * 100) / serv.total)) / 100,
                            Math.round(100 * ((serv.menor5 * 100) / serv.total)) / 100
                        ]
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
                nombre:"Excelencia (nota 7)",
                data:vmayor5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Nota 6",
                data:vmenor5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Insuficiencia (notas 1-4)",
                data:vtotal
            });

        }

        return {mensaje:clasificaciones};

    }

    async getEncuestasServiciosXLS({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getEncuestasServicios('${idEciProcesoCenco}')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        const evaluacion = Enumerable.from(result[0][0]).where("$.total > 0").select(function (serv) {
            return {
                Servicio:serv.nombre,
                Pregunta:serv.pregunta,
                Igual_7:serv.igual7,
                Igual_6:serv.igual6,
                Igual_5:serv.igual5,
                Igual_4:serv.igual4,
                Igual_3:serv.igual3,
                Igual_2:serv.igual2,
                Igual_1:serv.igual1,
                Total:serv.total,
                SNEx:Math.round(100 *(((serv.igual7 + serv.igual6) - (serv.igual1 + serv.igual2 + serv.igual3 + serv.igual4)) / serv.total) * 100) / 100
            }
        }).toArray();

        return {mensaje:evaluacion};

    }

}

module.exports = Informe