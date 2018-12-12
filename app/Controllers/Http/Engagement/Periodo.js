'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
/**
 *  /Engagement/Periodo
 * @class
 */
class Periodo {

    /**
     * @description
     * Lista Periodos de Engagement
     * @version 1.0.0
     * 
     * @example
     * curl -i -H "Accept: application/json" "localhost:3334/Engagement/Periodo/list" -d "cliente=eng"
     * 
     * returns:
     * [
     *   {
     *       "id": "4e26c5e4-5a38-11e8-80db-bc764e10787e",
     *       "nombre": "Engagement 2018",
     *       "codigo": "ENG2018",
     *       "inicio": "2018-01-01T03:00:00.000Z",
     *       "fin": "2019-01-01T03:00:00.000Z",
     *       "activo": 1,
     *       "dt_cre": "2018-05-22T03:46:48.000Z",
     *       "dt_mod": "2018-05-22T03:46:48.000Z"
     *   }
     * ]
     * @function
     * @return {Array<Periodo>} Lista de periodos
    */
    async list({request,response}){
        
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getPeriodos()`;
        const result   = await data.execQuery(cliente,query);

        response.json(result[0][0]);
    }
}

module.exports = Periodo
