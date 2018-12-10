'use strict'
const data = use('App/Utils/Data')
const uuidv1 = require('uuid/v1');
const kafka = require('kafka-node');


class Logging {
  async handle({
    request,
    response
  }, next) {

    try {

      var codigo = uuidv1();

      var cliente = request.input('cliente');
      var idusers = '';
      var module = request.params.module;
      var controller = request.params.controller;
      var action = request.params.action;
      var params = JSON.stringify(request.all());
      var type = 'CALL';


      var Producer = kafka.Producer;
      var KeyedMessage = kafka.KeyedMessage;
      var client = new kafka.Client('192.168.3.23:2181');
      var producer = new Producer(client);
      var km = new KeyedMessage('key', 'message');

      var obj = [{
        Log: {
          codigo: codigo,
          cliente: cliente,
          idusers: idusers,
          type: type,
          module,
          module,
          controller: controller,
          action: action,
          params: params
        }
      }];
      var jObj = JSON.stringify(obj);

      var payloads = [{
        topic: 'API_REQUEST',
        messages: [jObj],
        key: "API"
      }];
      producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
          producer.close();
          client.close();
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

    
    
    
      await next().then(() => {
        //console.log("SUCCESS");
      }).catch((error) => {
        //console.log("ERROR")
        //console.log(codigo);
        //console.log(response.response.statusCode);
        console.error(error);
      });
   
     /*

    response.response.on('finish', () => {
      console.log(codigo+":"+"FIN");
      console.log(response.response)
      //console.log(response.response.statusCode)
    })
    */

    //console.log(response.response.statusCode)
    

  }
}

module.exports = Logging
