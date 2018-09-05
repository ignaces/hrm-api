'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Encuesta {
    
    async getProcesos({request,response}){
      
        try {
            
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }
}

module.exports = Encuesta