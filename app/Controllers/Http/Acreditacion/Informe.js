const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
/**
 *Esta clase ....
 * @constructor
 */
class Informe {

    async getResultadoSistesis({request,response}){


        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadoSintesis(${proceso}, ${procesoPersona})`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: result[0][0]
        }
        response.json(body);
    }

    async getResultadoTCO({request,response}){


        const proceso = request.input('proceso');
        const procesoPersona = request.input('procesoPersona');
        const cliente =request.input('cliente') ;
        const query = `call acre_getResultadoTCO(${proceso}, ${procesoPersona})`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: {
              procesos: result[0][0]
          }
          
        }
        response.json(body);
    }
    
}

module.exports = Informe
