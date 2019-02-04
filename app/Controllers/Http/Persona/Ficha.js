'use strict'

var Enumerable = require('linq')
const data = use('App/Utils/Data')
const dateformat = require('dateformat');

class Ficha {

    async getPersonaDetalle({request,response}) {

        var idPersona = request.input('idPersona');
        const cliente = request.input('cliente');

        const query = `call pers_getPersonaDetalle('${idPersona}')`;
        const result = await data.execQuery(cliente, query);

        var persona = Enumerable.from(result[0][0]).distinct("$.idPersona").select(function (per) {
            return {
                idPersona:per.idPersona,
                nombres:per.nombres,
                apellidoPaterno:per.apellidoPaterno,
                apellidoMaterno:per.apellidoMaterno,
                email:per.email,
                imageUser:per.imageUser,
                codigoIdioma:per.codigoIdioma,
                idiomas:Enumerable.from(result[0][0]).where(`$.idPersona == "${per.idPersona}"`).select(function (i) {
                    return {
                        nombre:i.idioma,
                        banderaIdioma:i.banderaIdioma,
                        nivelIdioma:i.nivelIdioma
                    }
                }).toArray(),
                pais:per.pais,
                nombreNacionalidad:per.nombreNacionalidad,
                iconoPais:per.iconoPais,
                fechaNacimiento:per.fechaNacimiento,
                cargo:per.cargo
            }
        }).toArray();

        response.json(persona);
    }

    async getPersonaCurriculum({request,response}) {

        var idPersona = request.input('idPersona');
        var codigo = request.input('codigo');
        const cliente = request.input('cliente');

        const query = `call pers_getPersonaCurriculum('${idPersona}')`;
        const result = await data.execQuery(cliente, query);

        var curriculum = Enumerable.from(result[0][1]).distinct("$.codigo").select(function (cv) {
            return {
                id:cv.id,
                codigo:cv.codigo,
                tipo:cv.tipo,
                //idPersona:cv.idPersona,
                registros:Enumerable.from(result[0][0]).where(`$.codigo == "${cv.codigo}"`).select(function (reg) {
                    return {
                        id:reg.id,
                        codigo:cv.codigo,
                        titulo:reg.titulo,
                        desde:reg.desde,
                        hasta:reg.hasta,
                        descripcion:reg.descripcion,
                        ente:reg.bajada
                    }
                }).toArray()
            }
        }).toArray();

        response.json(curriculum);
    }

    async updateCv ({request,response}){
       
        var objCv = request.input("objCv");
        var idPersona = request.input("idPersona");
        var idCv = objCv.id;
        var titulo = objCv.titulo;
        var desde = objCv.desde;
        var hasta = objCv.hasta;
        var descripcion = objCv.descripcion;
        var ente = objCv.ente;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_updateCvPersona('${idPersona}','${idCv}','${titulo}','${desde}','${hasta}','${descripcion}','${ente}')`;
        const result = await data.execQuery(cliente, query);

        var curriculum = Enumerable.from(result[0][1]).distinct("$.codigo").select(function (cv) {
            return {
                id:cv.id,
                codigo:cv.codigo,
                tipo:cv.tipo,
                //idPersona:cv.idPersona,
                registros:Enumerable.from(result[0][0]).where(`$.codigo == "${cv.codigo}"`).select(function (reg) {
                    return {
                        id:reg.id,
                        codigo:cv.codigo,
                        titulo:reg.titulo,
                        desde:reg.desde,
                        hasta:reg.hasta,
                        descripcion:reg.descripcion,
                        ente:reg.bajada
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
            "data": curriculum
        });
    }

    async addCv ({request,response}){
       
        var objCv = request.input("objCv");
        var idPersona = request.input("idPersona");
        var idCv = objCv.id;
        var titulo = objCv.titulo;
        var codigo = objCv.codigo;
        var desde = objCv.desde;
        var hasta = objCv.hasta;
        var descripcion = objCv.descripcion;
        var ente = objCv.ente;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_addCvPersona('${idPersona}','${idCv}','${titulo}','${desde}','${hasta}','${descripcion}','${ente}','${codigo}')`;
        const result = await data.execQuery(cliente, query);

        var curriculum = Enumerable.from(result[0][1]).distinct("$.codigo").select(function (cv) {
            return {
                id:cv.id,
                codigo:cv.codigo,
                tipo:cv.tipo,
                //idPersona:cv.idPersona,
                registros:Enumerable.from(result[0][0]).where(`$.codigo == "${cv.codigo}"`).select(function (reg) {
                    return {
                        id:reg.id,
                        codigo:cv.codigo,
                        titulo:reg.titulo,
                        desde:reg.desde,
                        hasta:reg.hasta,
                        descripcion:reg.descripcion,
                        ente:reg.bajada
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
            "data": curriculum
        });
    }

    async deleteCv ({request,response}){
       
        var objCv = request.input("objCv");
        var idPersona = request.input("idPersona");
        var idCv = objCv.id;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_deleteCvPersona('${idPersona}','${idCv}')`;
        const result = await data.execQuery(cliente, query);

        var curriculum = Enumerable.from(result[0][1]).distinct("$.codigo").select(function (cv) {
            return {
                id:cv.id,
                codigo:cv.codigo,
                tipo:cv.tipo,
                //idPersona:cv.idPersona,
                registros:Enumerable.from(result[0][0]).where(`$.codigo == "${cv.codigo}"`).select(function (reg) {
                    return {
                        id:reg.id,
                        codigo:cv.codigo,
                        titulo:reg.titulo,
                        desde:reg.desde,
                        hasta:reg.hasta,
                        descripcion:reg.descripcion,
                        ente:reg.bajada
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
            "data": curriculum
        });
    }

}

module.exports = Ficha