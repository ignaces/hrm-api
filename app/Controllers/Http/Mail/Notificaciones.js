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

    async create({request,response}){
      const nombre =request.input('nombre');
      const to =request.input('to') ;
      const subject =request.input('subject') ;
      var body =request.input('body');
      const mask =request.input('mask');
      const tag =request.input('tag') ;
      const idCliente= request.input('idCliente') ;
      body = body.replace(/'/g,"''");
      const cliente = "app";
      //_idCliente,_nombre,_body,_subject,_mask,_tag
      console.log(body)
     try{
      const query = `call notificacion_addNotificacion('${idCliente}','${nombre}','${body}','${subject}','${mask}','${tag}')`;
  
      const usp   = await data.execQuery(cliente,query);
     
      response.json({mensaje:"OK"});
     }catch(err){
      response.json({mensaje:err});
     }
      

    }
    

}

module.exports = Notificaciones
