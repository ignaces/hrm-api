'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Data {
    
    async getPersonas({request,response}){
      
        try {
            /*const cliente =request.input('cliente');
            const codigo =request.input('codigo');
            const vista =request.input('vista');*/
            const query =`select top 10 * from emp_usuario`;
            const respuesta   = await data.execQueryMS(query);
            
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": respuesta
            });
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

module.exports = Data
