'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')

class Persona {
    async find({request,response}){
    
        const text =request.input('nombre');
        const cliente =request.input('cliente') ;
        const query =  `call getPersonas('${text}')`;
        const usp   = await data.execQuery(cliente,query);
      
      
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);--
      
      response.json(usp[0][0]);
    }

    async getIdPersona({request,response}){
      
        var idUser = request.input('idUser');
        const cliente =request.input('cliente') ;
        const query =  `call pers_getIdPersonaByIdUsuario('${idUser}')`;
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
    async getPersona({request,response}){
    
        var idPersona = request.input('idPersona');
        const cliente = request.input('cliente') ;
        const query =  `call pers_getPersona('${idPersona}')`;
        //const query =  `call pers_getClasificacion('${idPersona}')`;
        const usp   = await data.execQuery(cliente,query);
       
        
      
        const Clasificaciones = Enumerable.from(usp[0][0]).select(function(Clasificacion){
            return{
               nombre:Clasificacion.Clasificacion,
               valor:Clasificacion.Valor

            }
        })
        var persona = {
            identificador:usp[0][0][0].identificador,
            nombres:usp[0][0][0].nombres,
            apellidoPaterno:usp[0][0][0].apellidoPaterno,
            apellidoMaterno:usp[0][0][0].apellidoMaterno,
            email:usp[0][0][0].email,
            clasificaciones:Clasificaciones.toArray()      
        };
       
      
      response.json(persona);
      
    }
    
    
}

module.exports = Persona