'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');

class Avance {

    async getAvanceResumen({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call encuesta_getAvanceResumen('${idEncuestaAplicacion}')`;
        const result   = await data.execQuery(cliente,query);
        var estados = result[0][0];
        var cantidad = 0;
        for(var i in estados){
            cantidad +=estados[i].cantidad;
            estados[i].porcentaje = Math.round(estados[i].porcentaje);
        }
        estados[3]={
            cantidad: cantidad,
            estadoEncuesta: 'Total Encuestas',
            codigoEstado: 'TOTAL',
            class: 'primary',
            color:'#4489e4',
            icono: 'fa-users',
            porcentaje: 100,
            orden: 4
        }
        
        response.json(estados);
    }
    async getAvance({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call encuesta_getAvance('${idEncuestaAplicacion}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
    }
}

module.exports = Avance
