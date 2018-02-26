'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')
const got = use('got')
var Enumerable = require('linq');
class Mail {
    async sendEmail (to,subject,body,tag){
        
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

      async sendEmailBulk (to,recipients,subject,body,tag){
        
        

        var options_auth = new Buffer("api:key-2108efde358f1149e5e116f115c8047d").toString("base64")

        var query = {
            from:"enovum@fch.cl",
            to:to,
            html:body,
            subject:subject,
            "recipient-variables":JSON.stringify(recipients),
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
module.exports = new Mail