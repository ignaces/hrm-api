'use strict'
const got = use('got')
var Enumerable = require('linq');
/**
 * Mailgun
 * @class
 */
class Mailgun {

    async stats ({request,response}){
        const tag =request.input('tag') ;
        const event =request.input('event') ;
        var options_auth = new Buffer("api:key-2108efde358f1149e5e116f115c8047d").toString("base64")
        var filtros = {
            limit:300,
            tags:tag
        }
        
      const rStats = await got.get(`https://api.mailgun.net/v3/mg.enovum.cl/events`,
        {
          
          json:true,
          query: filtros,
          headers:{
            'Authorization': "Basic "+options_auth
          }      
        })
       
      return rStats.body;

    }

    async send ({request,response}){
      
      const to =request.input('to') ;
      const subject =request.input('subject') ;
      const body =request.input('body');
      const tag =request.input('tag') ;

      
      var options_auth = new Buffer("api:key-2108efde358f1149e5e116f115c8047d").toString("base64")
      var query = {
          from:"enovum@fch.cl",
          to:to,
          html:body,
          subject:subject,
          "o:tag":tag
      }
      
    const rStats = await got.post(`https://api.mailgun.net/v3/mg.enovum.cl/messages`,
      {
        form:true,
        body: query,
        headers:{
          'Authorization': "Basic "+options_auth
        }      
      })
     
    return rStats.body;

  }
  


    
}

module.exports = Mailgun
