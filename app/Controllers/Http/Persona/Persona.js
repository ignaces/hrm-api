'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
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
    
    async getPersonaByIdUser ({request,response}){
        var idUser = request.input('idUser');
        const cliente =request.input('cliente') ;
        
        const query = `call pers_getPersonaByIdUsuario('${idUser}')`;

        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0][0]
        });
    }

    async getPersonaByIdentificador ({request,response}){
        
        var identificador = request.input('identificador');
        const cliente =request.input('cliente') ;
        
        const query = `call pers_getPersonaByIdentificador('${identificador}')`;

        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }
    
    async getPersona({request,response}){
    
        var idPersona = request.input('idPersona');
        var identificador = "";
        
        const cliente = request.input('cliente');

        if(request.input('identificador'))
        {
            var identificador = request.input('identificador');
        }
        
        const query =  `call pers_getPersona('${idPersona}')`;
        //const query =  `call pers_getClasificacion('${idPersona}')`;
        const usp   = await data.execQuery(cliente,query);
       
        
       if(usp[0]==undefined){
           return response.json({})
       }
       if (usp[0][0][0]==undefined){
        return response.json({})
       }
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

    async addPersona ({request,response}){
        const cliente =request.input('cliente') ;
        const identificador =request.input('identificador') ;
        const nombres =request.input('nombres');
        const apellidoPaterno =request.input('apellidoPaterno') ;
        const apellidoMaterno =request.input('apellidoMaterno') ;
        const genero =request.input('genero') ;
        const email =request.input('email') ;
        const idUsuario =request.input('idUsuario') ;
        
        
        
        const query = `call pers_addPersona('${identificador}', '${nombres}', '${apellidoPaterno}', '${apellidoMaterno}', '${genero}', '${email}',${idUsuario})`;

        const respuesta   = await data.execQuery(cliente,query);
        //console.log(respuesta);
        response.json({
            "estado": respuesta[0][0],
            "paginacion": "",
            "data": respuesta[0][1]
        });
    }
    
    
}

module.exports = Persona