'use strict'

const data = use('App/Utils/Data')
var Enumerable = require('linq')
class Persona {
    async find({request,response}){
    
        const text =request.input('nombre');
        const cliente =request.input('cliente') ;
        const query =  `call getPersonas('${text}')`;
        const usp = await data.execQuery(cliente,query);
      
      
      
      //const usp = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);--
      
      response.json(usp[0][0]);
    }

    async getIdPersona({request,response}){
      
        var idUser = request.input('idUser');
        const cliente =request.input('cliente') ;
        const query =  `call pers_getIdPersonaByIdUsuario('${idUser}')`;
        const respuesta = await data.execQuery(cliente,query);
        
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

        const respuesta = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0][0]
        });
    }

    //>20181116-fretamal-vectoritcgroup
    async getPersonaByIdentificador ({request, response}){
        var identificador = request.input('persona_identificador');
        const cliente = request.input('cliente') ;

        try {
            const query = `call pers_getPersonaByIdentificador('${identificador}')`;
            const result = await data.execQuery(cliente,query);

            if (Object.keys(result[0][0]).length === 0) {
                response.json({
                    "status": { "code": "0000", "message": "" },
                    "data": null
                });
            } else {
                response.json({
                    "status": { "code": "0000", "message": "" },
                    "data": result[0][0]
                });
            }
        } catch (e) {
            response.json({
                "status": { "code": "0001", "message": e },
                "data": null
            });
        }
    }
    //<

    async getPersona({request,response}){
    
        var idPersona = request.input('idPersona');
        var identificador = "";
        
        const cliente = request.input('cliente');

        if(request.input('identificador'))
        {
            var identificador = request.input('identificador');
        }
        
        const query =  `call pers_getPersona('${idPersona}')`;
        console.log(query)
        //const query =  `call pers_getClasificacion('${idPersona}')`;
        const usp = await data.execQuery(cliente,query);
       
        
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
        const nacionalidad = request.input('nacionalidad');
        const imagen =request.input('imagen') ;
        
        const query = `call pers_addPersona('${identificador}', '${nombres}', '${apellidoPaterno}', '${apellidoMaterno}', '${genero}', '${email}',${idUsuario}, '${nacionalidad}','${imagen}')`;
        
        try{
        //return false;
        const respuesta = await data.execQuery(cliente,query);
        } catch (e) {
        
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": respuesta[0]
            });
        } 
        
    }

    async updPersona ({request,response}){
        const cliente =request.input('cliente') ;
        const identificador =request.input('identificador') ;
        const idUsuario =request.input('identificador') ;
        const nombres =request.input('nombres');
        const apellidoPaterno =request.input('apellidoPaterno') ;
        const apellidoMaterno =request.input('apellidoMaterno') ;
        const genero =request.input('genero') ;
        const email =request.input('email') ;
        const nacionalidad = request.input('nacionalidad');
        const imagen =request.input('imagen') ;
        
        const query = `call pers_updaPersona('${idUsuario}', '${nombres}', '${apellidoPaterno}', '${apellidoMaterno}', '${email}'`;
        
        try{
        //return false;
        
            const respuesta = await data.execQuery(cliente,query);

            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": "OK"
            });
            
        } catch (e) {
        
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": "ERROR"
            });
        } 
        
    }

    async resetPassByPersonaId ({request,response}){
        const cliente =request.input('cliente') ;
        const idPersona =request.input('idPersona') ;
        
        const query = `call pers_updPassword('${idPersona}')`;
        //console.log(query);
        //return false;
        try{
        //return false;
        
            const respuesta = await data.execQuery(cliente,query);

            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": "OK"
            });
            
        } catch (e) {
        
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": respuesta[0]
            });
        } 
        
    }

    async updDatosPersona ({request,response}){
        
        const cliente =request.input('cliente') ;
        var idPersona =request.input('idPersona');
        var nombres =request.input('nombres');
        var apellidoPaterno =request.input('apellidoPaterno');
        var apellidoMaterno =request.input('apellidoMaterno');
        var email =request.input('emailPersona');

        const query = `call pers_updDatosPersona('${idPersona}', '${nombres}', '${apellidoPaterno}', '${apellidoMaterno}', '${email}')`;
        //console.log(query);
        try{
        //return false;
        
            const respuesta = await data.execQuery(cliente,query);

            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": "OK"
            });
            
        } catch (e) {
        
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": respuesta[0]
            });
        } 
        
    }
    
    async updClasificacionesPersona({request,response}){
       
        const cliente =   request.input('cliente');
        var idProceso =   request.input('idProceso');
        var idPersona =   request.input('idPersona');
        
        
        if(request.input("codigoPadre"))
        {
            var codigoPadre = request.input("codigoPadre");
            var idClasificacion = request.input("idClasificacion");

            const query     =  `call pers_updClasificacionesPersonaEde('${idPersona}','${idProceso}','${codigoPadre}','${idClasificacion}');`;
            //console.log(query);
            //return false;
            const respuesta =  await data.execQuery(cliente,query);
            //console.log(respuesta[0][0]);
        } 
        
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            }
        });
    }
    
}

module.exports = Persona