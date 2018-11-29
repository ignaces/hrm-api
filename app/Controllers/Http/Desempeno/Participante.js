'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Participante {

    async getParticipantes({request,response}) {

        var idEde=request.input('idEde');
        var identificador=request.input('identificador');
        var appat=request.input('appat');
        var idPersona=request.input('idPersona');
        const cliente =request.input('cliente') ;
        const query = `call ede_getParticipantes('${idEde}','${identificador}','${appat}','${idPersona}')`;
        const respuesta = await data.execQuery(cliente,query);

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getParticipanteListByProcesoId({request, response}) {
        var dataStart = request.input('data_start');
        var dataLength = request.input('data_lenght');
        var procesoId = request.input('proceso_id');

        const cliente = request.input('cliente') ;

        try {
            const query = `call ede_getParticipantesByProcesoId(${dataStart},${dataLength},'${procesoId}')`;
            const respuesta = await data.execQuery(cliente, query);
            //console.log(JSON.stringify(respuesta));
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch(err) { 
            //response.json({mensaje:err});
            console.log(err)
        }
    }

    async getParticipanteCounterByProcesoId({request, response}) {
        var procesoId = request.input('proceso_id');
        const cliente = request.input('cliente') ;

        try {
            const query = `call ede_getParticipanteCounterByProcesoId('${procesoId}')`;
            const respuesta = await data.execQuery(cliente, query);
            //console.log(JSON.stringify(respuesta));
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch(err) { 
            //response.json({mensaje:err});
            console.log(err)
        }
    }

    async create({request, response}) {
        try  {
            var identificador = request.input('identificador');
            const cliente = request.input('cliente') ;

            const query = `call pers_getPersonaByIdentificador('${identificador}')`;
            const result = await data.execQuery(cliente,query);

            if (Object.keys(result[0][0]).length === 0) {
               console.log('persona no existe');
          
               var nombres = request.input('nombres');
               var apellido_paterno = request.input('apellido_paterno');
               var apellido_materno = request.input('apellido_materno');
               var email = request.input('email');
               var fecha_nacimiento = request.input('fecha_nacimiento');
               var genero_id = request.input('genero_id');
               var pais_id = request.input('pais_id');

                var q = [];
                q.push("INSERT INTO Persona (");
                q.push("id,");
                q.push("identificador,");
                q.push("nombres,");
                q.push("apellidoPaterno,");
                q.push("apellidoMaterno,");
                q.push("idGenero,");
                q.push("email,");
                q.push("fechaNacimiento,");
                q.push("idNacionalidad,");
                q.push("activo,");
                q.push("dt_cre,");
                q.push("dt_mod");
                q.push(") VALUES (");
                q.push("" + "uuid()" + ",");
                q.push("'" + identificador + "',");
                q.push("'" + nombres + "',");
                q.push("'" + apellido_paterno + "',");
                q.push("'" + apellido_materno + "',");
                q.push("'" + genero_id + "',");
                q.push("'" + email + "',");
                q.push("" + "now()" + "");
                q.push("'" + pais_id + "',");
                q.push("" + "1" + ",");
                q.push("" + "now()" + ",");
                q.push("" + "now()" + "");
                q.push(")");

                const respuesta = await data.execQuery(cliente, q.join(""));
            } else {
                console.log('persona si existe');
            }
        } catch (e) {
            console.log('error =[' + e + ']');
        }
        /*
        try {
            const query = `call ede_getParticipanteCounterByProcesoId('${procesoId}')`;
            const respuesta = await data.execQuery(cliente, query);
            //console.log(JSON.stringify(respuesta));
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch(err) { 
            //response.json({mensaje:err});
            console.log(err)
        }
        */
       return '{}'
    }
}

module.exports = Participante
