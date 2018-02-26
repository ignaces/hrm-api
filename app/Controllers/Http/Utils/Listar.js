'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')

class Listar {
    async getCombo({request,response}){
    
        const cliente =request.input('cliente') ;
        const tabla =request.input('tabla');
        
        const query =  `call util_getCombo('${tabla}')`;
        const usp   = await data.execQuery(cliente,query);
      
      const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": respuesta[0][0],
            "paginacion": "",
            "data": respuesta[0][1]
        });
    }
}

module.exports = Listar
