'use strict'
const data = use('App/Utils/Data')
const uuidv1 = require('uuid/v1');
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

      const query =`call core_addLogApi('${codigo}', '${cliente}', '${idusers}',  '${type}', '${module}', '${controller}', '${action}', '${params}')`;
      //const respuesta   = await data.execQuery(cliente,query);

<<<<<<< HEAD
      //console.log("module=>",request.params.module);
      //console.log("controller=>",request.params.controller);
      //console.log("action=>",request.params.action);
      //console.log("cliente=>",request.input("cliente"));
      //console.log("params=>",request.all()); 
=======
       /*console.log("module=>",request.params.module);
       console.log("controller=>",request.params.controller);
       console.log("action=>",request.params.action);
       console.log("cliente=>",request.input("cliente"));
       console.log("params=>",request.all()); 
       */
>>>>>>> e318ba168a0877bbae59b4bdb8094d058f51baa6
      
    } catch (error) {
      console.log(error);
    }
   

    await next()
  }
}

module.exports = Logging
