'use strict'
const got = use('got')
const data = use('App/Utils/Data')
var Enumerable = require('linq');
/**
 * Notificaciones
 * @class
 */
class Usuario {

    async getUsuarioByEmail({request,response}){
    
        const email =request.input('email') ;
        //console.log(email);

        const cliente = "app";
        //const query = `call user_getUserByEmail('${email}')`;
      
        const query =  `call user_getUserByEmail('${email}')`;
        //const usp   = await data.execQuery(cliente,query);
      
        const respuesta   = await data.execQuery(cliente,query);
        //console.log(respuesta[0][0]);
        response.json({
            "estado": "",
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
        
    }

    async getUsuarioByUserName({request,response}){
    
        const username =request.input('user') ;
        //console.log(email);
        console.log(username)
        const cliente = "app";
        //const query = `call user_getUserByEmail('${email}')`;
      
        const query =  `call user_getUserByUsername('${username}')`;
        console.log(query)
        //const usp   = await data.execQuery(cliente,query);
      
        const respuesta   = await data.execQuery(cliente,query);
        console.log(respuesta[0][0]);
        response.json({
            "estado": "",
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
        
    }
}

module.exports = Usuario