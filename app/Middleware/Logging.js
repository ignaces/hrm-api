'use strict'

class Logging {
  async handle ({request,response}, next) {
    
    try {
      console.log("module=>",request.params.module);
      console.log("controller=>",request.params.controller);
      console.log("action=>",request.params.action);
      console.log("cliente=>",request.input("cliente"));
      console.log("params=>",request.all()); 
      
    } catch (error) {
      response.redirect('/login');
    }
   

    await next()
  }
}

module.exports = Logging
