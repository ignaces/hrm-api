'use strict'
const Database = use('Database')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
class Data {
    async getColaboradoresMismoCargoCenco({request,response}){
        try {
            
            const identificadoresIn =request.input('identificadores');
            
            var identificadores = `'''${identificadoresIn.toString().replace(/,/g , "'',''")}'''`;
            const queryJof =`exec getColaboradoresJof ${identificadores}`;
            
            const resultJof   = await data.execQueryMS(queryJof);

            const jof =Enumerable.from(resultJof).where(`$.isJof == true`).select(function(isjof){
                                
                return  isjof.identificador
                
            }).toArray()

            const nojof =Enumerable.from(resultJof).where(`$.isJof == false`).select(function(isjof){
                                
                return  isjof.identificador
                
            }).toArray()
            
            var salida=[];
            
            if(nojof!=null){
                var iNoJof= `'''${nojof.toString().replace(/,/g , "'',''")}'''`;
                const queryMismoCenco =`exec getColaboradoresMismoCargoCenco ${iNoJof}`;
                
                const result   = await data.execQueryMS(queryMismoCenco);

                salida=result;
            }
            
            if(jof!=null){
                var iJof= `'''${jof.toString().replace(/,/g , "'',''")}'''`;
                const queryCargo =`exec getColaboradoresMismoCargo ${iJof}`;
                
                const resultCargo   = await data.execQueryMS(queryCargo);    
                for(var j in resultCargo){
                    salida.push(resultCargo[j])
                }
                
            }
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": salida
            });
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }

    async getColaboradoresMismoCargoCencoByMail({request,response}){
        try {
            
            const correosIn =request.input('correos');
            
            var correos = `'''${correosIn.toString().replace(/,/g , "'',''")}'''`;
            
            const query =`exec getColaboradoresMismoCargoCencoByMail ${correos}`;
            
            const result   = await data.execQueryMS(query);
            
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": result
            });
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }

    async getPersona({request,response}){
        try {
            
            const email =request.input('email');
            
            
            
            const query =`exec getPersonaByMail '${email}'`;
            
            const result   = await data.execQueryMS(query);
            
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": result[0]
            });
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }
    async getColaboradoresByFilter({request,response}){
        try {
            /*
            @nombre VARCHAR(100), 
            @apellidoPaterno VARCHAR(100),
            @apellidoMaterno VARCHAR(100),
            @email varchar(500),
            @nivelesClasificacion varchar(max)
            */
            //const identificador =request.input('identificador');
            const nombre =request.input('nombre');
            const apellidoPaterno =request.input('apellidoPaterno');
            const apellidoMaterno =request.input('apellidoMaterno');
            const email =request.input('email');
            const nivelesArr = request.input('niveles');
            const niveles = nivelesArr.toString();

            const cargosArr = request.input('cargos');
            
            const cargos = cargosArr.toString();
            
            const query =`exec getColaboradoresByFilter '', '${nombre}','${apellidoPaterno}','${apellidoMaterno}','${email}','${niveles}','${cargos}'`;
            
            const result   = await data.execQueryMS(query);
            
            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": result
            });
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }

    async getClasificaciones({request,response}){
        
        try {
            /*const cliente =request.input('cliente');
            const codigo =request.input('codigo');
            const vista =request.input('vista');*/
            const query =`exec getClasificaciones`;
            
            const result   = await data.execQueryMS(query);
            var clasificacionesOut = [];
         
            const clasificaciones = Enumerable.from(result).distinct("$.idclasificacion").select(function(clasificacion){
                
                
                //Fondo, subdependencia y tipos de cargo
                var nombre = clasificacion.clasificacion;
                switch(nombre){
                    case "CENCO":
                        nombre = "UNIDAD";    
                    break;
                }
                    
                        return{
                            idclasificacion:clasificacion.idclasificacion,
                            clasificacion:nombre,
                            niveles:Enumerable.from(result).where(`$.idclasificacion == "${clasificacion.idclasificacion}"`).select(function(nivel){
                                
                                return{
                                    id:nivel.idnivel,
                                    nivel:nivel.nivel
            
                                }
                            }).toArray()

                        }
                


            })

            clasificacionesOut = {
                clasificaciones:clasificaciones.toArray()
            }

            response.json({
                "estado": {
                    "codigo": "OK",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": clasificacionesOut
            });
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": e.message
                },
                "paginacion": "",
                "data": ""
            });
        } 
    
    }
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
    async getCargos({request,response}){
      
        try {
            /*const cliente =request.input('cliente');
            const codigo =request.input('codigo');
            const vista =request.input('vista');*/
            const query =`exec getCargos`;
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