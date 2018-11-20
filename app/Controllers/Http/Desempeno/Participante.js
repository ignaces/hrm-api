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

}

module.exports = Participante