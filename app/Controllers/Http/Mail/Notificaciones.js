'use strict'
const got = use('got')
const data = use('App/Utils/Data')
/**
 * Notificaciones
 * @class
 */
class Notificaciones {

    

    async getNotificaciones({request,response}){

      const idCliente =request.input('idCliente') ;
      const cliente = "app";
      const query = `call notificacion_getNotificaciones('${idCliente}')`;
      
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0]);
    }

    async getNotificacion({request,response}){

      const idNotificacion =request.input('idNotificacion') ;
      const cliente = "app";
      const query = `call notificacion_getNotificacion('${idNotificacion}')`;
      
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0][0]);
    }
    
}

module.exports = Notificaciones
