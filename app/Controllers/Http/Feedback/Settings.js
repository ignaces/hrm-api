'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
const dateformat = require('dateformat');
const mailgun = use('App/Utils/Mail') ;

class Settings {

    async getParametro({request,response}){
       
        const param =request.input('param') ;
        const cliente =request.input('cliente') ;
        var where ="";
        
        if(param!=null && param!=""){
            where = `where codigo='${param}'`;
        }
        const query =  `select codigo,nombre,valor from FeedbackParametros ${where} ;`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0]
        });
    }

    


}

module.exports=Settings