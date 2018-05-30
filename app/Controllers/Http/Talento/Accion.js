'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
const dateformat = require('dateformat');
class Accion {
    async getAccionesPredefinidas({request,response}){
    
        
        
        const cliente = request.input('cliente');
        
        const query =  `call tale_getAccionesPredefinidas()`;
        
        
        const result   = await data.execQuery(cliente,query);

        const acciones = result[0][0];
        
        response.json(acciones);
    }

    async getCompetencias({request,response}){
        const idModelo = '8ddf9879-63bb-11e8-8fb3-bc764e100f2b';//request.input("idModelo");
        const cliente = request.input('cliente');
        
        const query =  `call tale_getCompetencias('${idModelo}')`;
        
        
        const result   = await data.execQuery(cliente,query);

        const competencias = result[0][0];
        
        response.json(competencias);
    }
}
module.exports =Accion;