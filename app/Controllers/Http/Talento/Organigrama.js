'use strict'

var Enumerable = require('linq')
const data = use('App/Utils/Data')
const dateformat = require('dateformat');
/**
 *  /Talento/Organigrama
 * @class
 */
class Organigrama {
    /**
     * @description
     * Setea sucesor de una posición
     * @version 1.0.0
     * 
     * @example
     * curl -i -H "Accept: application/json" "localhost:3334/Talento/Organigrama/setSucesor" -d "cliente=cs,idPosicion=2222,idPersonaProceso=12222"
     * 
     * message OK 
     * @function
     * @return {string} respuesta
    */
    async setSucesor({request,response}){

        const cliente = request.input('cliente');
        const idPosicion = request.input('idPosicion');
        const idPersonaProceso = request.input('idPersonaProceso');
        const query =  `call tale_setSucesor('${idPosicion}','${idPersonaProceso}')`;
        
        const result   = await data.execQuery(cliente,query);
        
        response.json({message:"OK"});
    }
    /**
     * @version 1.0.0
     * @description
     * Elimina sucesor de una posición
     * @example
     * {@lang bash}
     * curl -i -H "Accept: application/json" "localhost:3334/Talento/Organigrama/delSucesor" -d "cliente=cs,idSucesion=2222"
     *
     * var message OK 
     * @function
     * @return {string} respuesta
    */
    async delSucesor({request,response}){

        const cliente = request.input('cliente');
        const idSucesion = request.input('idSucesion');
        const query =  `call tale_delSucesor('${idSucesion}')`;
        
        const result   = await data.execQuery(cliente,query);
        
        response.json({message:"OK"});
    }
}
module.exports =Organigrama;