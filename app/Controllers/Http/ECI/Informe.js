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

    async getEncuestasServiciosxGerencia({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getEncuestasServiciosxGerencia('${idEciProcesoCenco}')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        var servicios = Enumerable.from(result[0][0]).distinct("$.tipo").select(function (resultado) {
            return {
                tipo:resultado.tipo,
                peso:resultado.peso,
                totalTipo:0,
                SNExXTipoEncuesta:0,
                SNExXTipoEncuestaPonderado:0,    
                servicios:Enumerable.from(result[0][0]).where(`$.tipo == "${resultado.tipo}"`).select(function(serv){
                    return {
                        id:serv.id,
                        nombre:serv.nombre,                            
                        mayor5:serv.mayor5,
                        menor5:serv.menor5,
                        total:serv.total,
                        SNExXEncuesta:Math.round(100 *((serv.mayor5 - serv.menor5)/serv.total) * 100) / 100
                    }
                }).toArray()
            }
        }).toArray();

        for(var c in servicios){
            var tipo = servicios[c];
            var vSNExXTipoEncuesta = 0;
            var vtotal = 0;

            for(var r in tipo.servicios){
                var res = tipo.servicios[r];
                vtotal = vtotal + res.total;
            }
            for(var r in tipo.servicios){
                var res = tipo.servicios[r];

                vSNExXTipoEncuesta = vSNExXTipoEncuesta + (res.total/vtotal * res.SNExXEncuesta);
            }

            servicios[c].totalTipo = vtotal;
            servicios[c].SNExXTipoEncuesta = Math.round((vSNExXTipoEncuesta) * 100) / 100;
            servicios[c].SNExXTipoEncuestaPonderado = Math.round((vSNExXTipoEncuesta/servicios[c].peso * 100) * 100) / 100;
        }

        var tPonderado =0;
        var i=0;
        for(var c in servicios){
            var serv = servicios[c];
            tPonderado = tPonderado +  serv.SNExXTipoEncuestaPonderado;
            i++;
        }

        var serv = {
            SNExPorUnidad:Math.round((tPonderado/i)* 100) / 100,
            servicios:servicios
        };

        return {data:serv};

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
                unidad:resultado.unidad,
                estadosGen:[],
                estados:Enumerable.from(result[0][0]).where(`$.id == "${resultado.id}" && $.total > 0`).select(function(serv){
                    return {
                        //nombre:Math.round(100 *(((serv.mayor5) - (serv.menor5)) / serv.total) * 100) / 100,
                        nombre:serv.pregunta,
                        data:[
                            Math.round(100 * (((serv.igual6 + serv.igual7) * 100) / serv.total)) / 100,
                            Math.round(100 * ((serv.igual5 * 100) / serv.total)) / 100,
                            Math.round(100 * (((serv.igual4 + serv.igual3 + serv.igual2 + serv.igual1) * 100) / serv.total)) / 100
                        ],
                        dataGen:[
                            (serv.igual6 + serv.igual7),
                            serv.igual5,
                            (serv.igual4 + serv.igual3 + serv.igual2 + serv.igual1),
                            serv.total
                        ]
                    }
                }).toArray()
            }
        }).toArray();

        var mayor = 0; var menor = 0; var igual = 0; var total = 0;
        for(var i in clasificaciones){
            var estados = clasificaciones[i].estados;
            var vmayor5 = []; var vmenor5 = []; var vigual5 = []; var vpregunta = [];

            for(var e in estados){
                vpregunta.push(estados[e].nombre);
                vmayor5.push(estados[e].data[0]);
                vigual5.push(estados[e].data[1]);
                vmenor5.push(estados[e].data[2]);

                mayor+=estados[e].dataGen[0];
                igual+=estados[e].dataGen[1];
                menor+=estados[e].dataGen[2];
                total+=estados[e].dataGen[3];
            }

            clasificaciones[i].estados = [];
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Satisfecho: Nota 6 y 7",
                data:vmayor5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Nota 5",
                data:vigual5
            });
            clasificaciones[i].estados.push({
                preguntas:vpregunta,
                nombre:"Insatisfecho: de 1 a 4",
                data:vmenor5
            });

        }        

        clasificaciones[0].estadosGen.push({
            preguntas:[clasificaciones[0].unidad],
            nombre:"Satisfecho: Nota 6 y 7",
            data:[Math.round(100 * ((mayor * 100) / total)) / 100]
        });
        clasificaciones[0].estadosGen.push({
            preguntas:[clasificaciones[0].unidad],
            nombre:"Nota 5",
            data:[Math.round(100 * ((igual * 100) / total)) / 100]
        });
        clasificaciones[0].estadosGen.push({
            preguntas:[clasificaciones[0].unidad],
            nombre:"Insatisfecho: de 1 a 4",
            data:[Math.round(100 * ((menor * 100) / total)) / 100]
        });

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