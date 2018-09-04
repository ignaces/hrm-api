'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Core {
    
    async getInstruccion({request,response}){
      
        try {
            const cliente =request.input('cliente');
            const codigo =request.input('codigo');
            const vista =request.input('vista');
            const query =`call core_getInstruccion('${codigo}','${vista}')`;
            const respuesta   = await data.execQuery(cliente,query);
            
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta[0][0]
            });
        } catch (e) {
            console.log(e);
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

module.exports = Core
