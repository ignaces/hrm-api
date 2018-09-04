'use strict'
const Database = use('Database')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
class Data {
    async getColaboradoresMismoCargoCenco({request,response}){
        try {
            
            const identificadoresIn =request.input('identificadores');
            
            var identificadores = `'''${identificadoresIn.toString().replace(/,/g , "'',''")}'''`;
            
            const query =`exec getColaboradoresMismoCargoCenco ${identificadores}`;
            
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
    async getColaboradoresByFilter({request,response}){
        try {
            /*
            @nombre VARCHAR(100), 
            @apellidoPaterno VARCHAR(100),
            @apellidoMaterno VARCHAR(100),
            @email varchar(500),
            @nivelesClasificacion varchar(max)
            */
            const identificador =request.input('identificador');
            const nombre =request.input('nombre');
            const apellidoPaterno =request.input('apellidoPaterno');
            const apellidoMaterno =request.input('apellidoMaterno');
            const email =request.input('email');
            const nivelesArr =request.input('niveles');
            const niveles = nivelesArr.toString();
            
            const query =`exec getColaboradoresByFilter '${identificador}', '${nombre}','${apellidoPaterno}','${apellidoMaterno}','${email}','${niveles}'`;
            
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
                return{
                    idclasificacion:clasificacion.idclasificacion,
                    clasificacion:clasificacion.clasificacion,
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
}

module.exports = Data