'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Users {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      const cliente =request.input('cliente') ;
      
      const query = `call getUsers('${text}')`;
      console.log(data)
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0]);
    }

    async getIdPersona({request,response}){
      
        var idUser = request.input('idUser');

        const cliente =request.input('cliente') ;
        const query =`call pers_getIdPersonaByIdUsuario('${idUser}')`;
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

module.exports = Users
