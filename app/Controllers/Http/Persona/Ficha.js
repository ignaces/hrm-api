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
                        idIdiomaPerfil:i.idIdiomaPerfil,
                        idIdioma:i.idIdioma,
                        idNivel:i.idNivel,
                        nombre:i.idioma,
                        banderaIdioma:i.banderaIdioma,
                        nivelIdioma:i.nivelIdioma
                    }
                }).toArray(),
                pais:per.pais,
                nombreNacionalidad:per.nombreNacionalidad,
                iconoPais:per.iconoPais,
                fechaNacimiento:per.fechaNacimiento,
                cargo:per.cargo,
                lisIdiomas:Enumerable.from(result[0][1]).distinct("$.id").select(function (idi) {
                    return {
                        id:idi.id,
                        codigo:idi.codigo,
                        nombre:idi.nombre
                    }
                }).toArray(),
                listNiveles:Enumerable.from(result[0][2]).distinct("$.id").select(function (niv) {
                    return {
                        id:niv.id,
                        codigo:niv.codigo,
                        nombre:niv.nombre
                    }
                }).toArray()
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

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

    async updateIdioma ({request,response}){
        var objIdioma = request.input("objIdioma");
        var idIdiomaPerfil = objIdioma.idIdiomaPerfil;
        var idIdioma = objIdioma.idIdioma;
        var idNivel = objIdioma.idNivel;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_updateIdiomaPersona('${idIdiomaPerfil}','${idIdioma}','${idNivel}')`;
        const result = await data.execQuery(cliente, query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

    async addIdioma ({request,response}){
        var objIdioma = request.input("objIdioma");
        var idPersona = request.input("idPersona");
        var idIdioma = objIdioma.idIdioma;
        var idNivel = objIdioma.idNivel;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_addIdiomaPersona('${idPersona}','${idIdioma}','${idNivel}')`;
        const result = await data.execQuery(cliente, query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

    async addCv ({request,response}){
       
        var objCv = request.input("objCv");
        var idPersona = request.input("idPersona");
        var titulo = objCv.titulo;
        var codigo = objCv.codigo;
        var desde = objCv.desde;
        var hasta = objCv.hasta;
        var descripcion = objCv.descripcion;
        var ente = objCv.ente;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_addCvPersona('${idPersona}','${titulo}','${desde}','${hasta}','${descripcion}','${ente}','${codigo}')`;
        const result = await data.execQuery(cliente, query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

    async deleteIdioma ({request,response}){
        var objIdioma = request.input("objIdioma");
        var idIdiomaPerfil = objIdioma.idIdiomaPerfil;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_deleteIdiomaPersona('${idIdiomaPerfil}')`;
        const result = await data.execQuery(cliente, query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

    async deleteCv ({request,response}){
       
        var objCv = request.input("objCv");
        var idCv = objCv.id;
        
        const cliente =request.input('cliente') ;
        const query =  `call pers_deleteCvPersona('${idCv}')`;
        const result = await data.execQuery(cliente, query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }

}

module.exports = Ficha