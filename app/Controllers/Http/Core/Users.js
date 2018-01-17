'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Users {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      const hostname =request.input('hostname') ;
      
      const query = `call getUsers('${text}')`;
      
      const usp   = await data.execQuery(hostname,query);
      
      response.json(usp[0][0]);
    }

    async getIdPersona({request,response}){
      
        var idUser = request.input('idUser');

        var query = `call pers_getIdPersonaByIdUsuario('${idUser}')`;
        
        var respuesta = await Database.connection('dev').schema.raw(query);
        
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

module.exports = Users
