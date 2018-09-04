'use strict'

var Enumerable = require('linq')
const data = use('App/Utils/Data')
const dateformat = require('dateformat');

class Organigrama {
    async setSucesor({request,response}){

        const cliente = request.input('cliente');
        const idPosicion = request.input('idPosicion');
        const idPersonaProceso = request.input('idPersonaProceso');
        const query =  `call tale_setSucesor('${idPosicion}','${idPersonaProceso}')`;
        
        const result   = await data.execQuery(cliente,query);
        
        response.json({message:"OK"});
    }
    async delSucesor({request,response}){

        const cliente = request.input('cliente');
        const idSucesion = request.input('idSucesion');
        const query =  `call tale_delSucesor('${idSucesion}')`;
        
        const result   = await data.execQuery(cliente,query);
        
        response.json({message:"OK"});
    }
}
module.exports =Organigrama;