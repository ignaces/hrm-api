'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Permisos {

    async getRolesPersona({request,response}){
      
        var idPersona = request.input('idPersona');

        const cliente =request.input('cliente') ;
        const query =`call core_getRolPersona('${idPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
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

module.exports = Permisos
