'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
class Users {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      const cliente =request.input('cliente') ;
      
      const query = `call getUsers('${text}')`;
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
    async getMenuUser({request,response}){
        var idUser = request.input('idUser');

        const cliente ="app";
        const query =`call user_getMenu('${idUser}')`;
        console.log(query)
        const respuesta   = await data.execQuery(cliente,query);
        var usuario = {
            roles:[],
            menu:{}
        }
        
        const roles = Enumerable.from(respuesta[0][0]).distinct("$.idRol").select(function(rol){
            return{
                id:rol.idRol,
                nombre:rol.Rol
            }
        })

        usuario.roles = roles.toArray();

        const paginas =Enumerable.from(respuesta[0][0]).distinct("$.idPagina").select(function(ruta){
            return{
                id:ruta.idPagina,
                label:ruta.texto,
                modulo:ruta.modulo,
                controller:ruta.controller,
                accion:ruta.accion,
                iconClass:ruta.iconClass,
                orden:ruta.orden
            }
        })
       usuario.menu = paginas.toArray();
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": usuario
        });
    }
    
    async getRequiereCambioClave({request,response}){
        var idUser = request.input('idUser');
        const cliente ="app";
        const query =`call user_getRequiereCambioClave('${idUser}')`;
        
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

    async updateRequiereCambioClave({request,response}){
        var idUser = request.input('idUser');
        var estado = request.input('estado');
        
        const cliente ="app";
        const query =`call user_updateRequiereCambioClave('${idUser}','${estado}')`;

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

    async addPersonaUsuario({request,response}){
        const cliente =request.input('cliente') ;
        var idPersona = request.input('idPersona');
        var username = request.input('username');

        
        const query =`call user_addPersonaUsuario('${idPersona}','${username}')`;
        
        console.log(query)
        
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

    
}

module.exports = Users
