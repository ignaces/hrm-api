'use strict'
const got = use('got')
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


    
}

module.exports = Mailgun
