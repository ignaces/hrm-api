'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Administracion {

    async getClientes({request,response}){
      
                
        const query =`call cliente_getClientes('')`;
        const respuesta   = await data.execQuery('app',query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
        //response.json(respuesta[0][0]);
    }
    
    

    
}

module.exports = Administracion
