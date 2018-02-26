'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
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
      
     try{
      const query = `call notificacion_addNotificacion('${idCliente}','${nombre}','${body}','${subject}','${mask}','${tag}')`;
  
      const usp   = await data.execQuery(cliente,query);
     
      response.json({mensaje:"OK"});
     }catch(err){
      response.json({mensaje:err});
     }
      

    }

    async sendNotificacion({request,response}){
      var idNotificacion = request.input("idNotificacion")
      var correos = request.input("correos")
      
      const cliente = "app";
      const query = `call notificacion_getNotificacion('${idNotificacion}')`;
      
      const rs   = await data.execQuery(cliente,query);

      var notificacion = rs[0][0][0];
      var body = notificacion.body.replace(new RegExp("#{Nombres}",'g'),'%recipient.nombres%');
         body = body.replace(new RegExp("#{ApellidoPaterno}",'g'),'%recipient.apellidoPaterno%');
         body = body.replace(new RegExp("#{ApellidoMaterno}",'g'),'%recipient.apellidoMaterno%');
         body = body.replace(new RegExp("#{UserName}",'g'),'%recipient.usuario%');
         body = body.replace(new RegExp("#{Password}",'g'),'%recipient.password%');
      var recipients = {};
      var to = "";
      
      var blocks = [];
      
      for(var item in correos){
        to = to + correos[item].email +",";
        recipients[correos[item].email] = {
          nombres:correos[item].nombres,
          apellidoPaterno:correos[item].apellidoPaterno,
          apellidoMaterno:correos[item].apellidoMaterno,
          usuario:correos[item].usuario,
          password:correos[item].password,
        }
        var finBloque = (item+1)%1000;
        if(finBloque==0){
          blocks.put({to:to,recipients:recipients});
          to="";
          recipients={};
        }
        
        // recipients.put(`{"${correos[item].email}": {"nombres":"${correos[item].nombres}"},}`)
      }
      
      if(to!=""){
        
        blocks.push({
          to:to,
          recipients:recipients
        });
      }
      
      for(var block in blocks){
        try{
          
          const email = await mailgun.sendEmailBulk(blocks[block].to,blocks[block].recipients,notificacion.subject,body,notificacion.tag)
        }catch(err){
          console.log(err)
        }     
      }
       
     
      
      return {mensaje:"ok"}
    }
    

}

module.exports = Notificaciones
