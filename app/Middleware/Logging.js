'use strict'
const data = use('App/Utils/Data')
const uuidv1 = require('uuid/v1');
var kafka = require('kafka-node');


class Logging {
  async handle ({request,response}, next) {
    
    try {
      var codigo = uuidv1();

      var cliente = request.input('cliente');
      var idusers = '';
      var module = request.params.module;
      var controller = request.params.controller;
      var action = request.params.action;
      var params = JSON.stringify(request.all());
      var type = 'CALL';


      Producer = kafka.Producer;
      KeyedMessage = kafka.KeyedMessage;
      client = new kafka.Client('192.168.3.23:2181');
      producer = new Producer(client);
      km = new KeyedMessage('key', 'message');
    
      var obj = [{Log:{codigo:codigo,
                        cliente:cliente,
                      idusers:idusers,
                    type:type,
                  module,module,
                controller:controller,
              action:action,
            params:params}}];
      var jObj = JSON.stringify(obj);

      payloads = [
              { topic: 'API_REQUEST', messages: [jObj],key:"API"}
          ];
      producer.on('ready', function () {
          producer.send(payloads, function (err, data) {
              console.log(data);
          });
      });
      
      producer.on('error', function (err) {
          console.log(err)
      })

      //const query =`call core_addLogApi('${codigo}', '${cliente}', '${idusers}',  '${type}', '${module}', '${controller}', '${action}', '${params}')`;
      //const respuesta   = await data.execQuery(cliente,query);

       /*console.log("module=>",request.params.module);
       console.log("controller=>",request.params.controller);
       console.log("action=>",request.params.action);
       console.log("cliente=>",request.input("cliente"));
       console.log("params=>",request.all()); 
       */
      
    } catch (error) {
      console.log(error);
    }
   

    await next()
  }
}

module.exports = Logging
