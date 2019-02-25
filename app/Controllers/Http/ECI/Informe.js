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
                total:0,
                unidad:resultado.unidad,
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

        var total = 0;
        for(var c in servicios){
            var tipo = servicios[c];
            var vSNExXTipoEncuesta = 0;
            var vtotal = 0;

            for(var r in tipo.servicios){
                var res = tipo.servicios[r];
                vtotal+= res.total;
            }
            for(var r in tipo.servicios){
                var res = tipo.servicios[r];

                vSNExXTipoEncuesta = vSNExXTipoEncuesta + (res.total/vtotal * res.SNExXEncuesta);
            }

            total+=vtotal;
            //servicios[c].totalTipo = vtotal;
            servicios[c].SNExXTipoEncuesta = Math.round((vSNExXTipoEncuesta) * 100) / 100;
            servicios[c].SNExXTipoEncuestaPonderado = Math.round((vSNExXTipoEncuesta) * 100) / 100;
        }

        var tPonderado =0;
        var i=0;
        for(var c in servicios){
            var serv = servicios[c];
            servicios[c].totalTipo = total;
            tPonderado+=  serv.SNExXTipoEncuestaPonderado;
            //tPonderado+=  serv.SNExXTipoEncuesta;
            for(var d in serv.servicios){
                i++;
            }
        }

        var serv = {
            SNExPorUnidad:Math.round((tPonderado)* 100) / 100,
            servicios:servicios
        };

        return {data:serv};

    }

    async getComentariosyAdicionalesXCenco({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getComentariosyAdicionalesXCenco('')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        var com = Enumerable.from(result[0][0]).distinct("$.Grupo").select(function (resultado) {
            return {
                Grupo:resultado.Grupo,
                listServ:Enumerable.from(result[0][0]).where(`$.Grupo == "${resultado.Grupo}"`).distinct("$.servicio").select(function(res){
                    return {
                        servicio:res.servicio,
                        list:Enumerable.from(result[0][0]).where(`$.servicio == "${res.servicio}" && $.Grupo == "${res.Grupo}"`).select(function(list){
                            return {
                                valor:list.valor
                            }
                        }).toArray()
                    }
                }).toArray()
            }
        }).toArray();

        return {data:com};
    }

    async getListadoServiciosGeneral({request,response}) {
        const idEciProcesoCenco = request.input('idEciProcesoCenco');

        const query =`call eci_getCencoJerarquia('')`;
        const cliente =request.input('cliente');

        const result = await data.execQuery(cliente,query);

        var json = [];

        for(var i in result[0][0]){
            var a = result[0][0][i]
            json.push(a.codigo)
        }

        const queryJson =`call eci_getValoresArbol('${JSON.stringify(json)}')`;
        const resultJson = await data.execQuery(cliente,queryJson);

        var servicios = Enumerable.from(resultJson[0][0]).select(function (resultado) {
            return {
                pos:resultado.pos,
                posPadre:resultado.posPadre,
                codigo:resultado.codigo,
                nivel:resultado.nivel,
                nombre:resultado.Nombre,                            
                mayor5:resultado.mayor5,
                menor5:resultado.menor5,
                total:resultado.total,
                SNExXHijos:0,
                SNExXEncuesta:Math.round(100 *((resultado.mayor5 - resultado.menor5)/resultado.total) * 100) / 100,
                listHijos:Enumerable.from(resultJson[0][0]).where(`$.posPadre == "${resultado.pos}"`).select(function(res){
                    return {
                        SNExXEncuesta:Math.round(100 *((res.mayor5 - res.menor5)/res.total) * 100) / 100
                    }
                }).toArray()
            }
        }).toArray();

        servicios.reverse();
        for(var serv in servicios){
            var s = servicios[serv];
            var count = 0;
            var sum = 0;

            /*for(var h in s.listHijos){
                if (s.listHijos[h].SNExXEncuesta > 0){
                    sum+=s.listHijos[h].SNExXEncuesta;
                    count++;                 
                }
            }*/

            var en = Enumerable.from(servicios).where(`$.posPadre == "${s.pos}"`).select(function(res){
                if(res.total > 0 || res.SNExXEncuesta > 0){
                    sum+=res.SNExXEncuesta;
                    count++; 
                }                
                return {
                    SNExXEncuesta:res.SNExXEncuesta
                }
            }).toArray();

            if (count > 0){
                if (servicios[serv].SNExXEncuesta > 0){
                    sum+=servicios[serv].SNExXEncuesta;
                    count++;
                }
                if ((Math.round((sum/count)* 100) / 100) > 0){
                    servicios[serv].SNExXEncuesta = Math.round((sum/count)* 100) / 100;
                }
                servicios[serv].SNExXHijos = Math.round((sum/count)* 100) / 100;
            }
        }
        servicios.reverse();

        return {data:servicios};
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