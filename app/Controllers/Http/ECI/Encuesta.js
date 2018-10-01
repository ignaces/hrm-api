'use strict'
const Database = use('Database')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
class Encuesta {
    
    async getProcesos({request,response}){
      
        try {
            
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
    async setOpinantesEncuesta({request,response}){
        const identificadoresIn =request.input('identificadores');
        const idEncuesta = request.input("idEncuesta");
        try {
            /**
             * 1.-Traer personas desde bci
             * 2-.Crear personas en base hrm
             * 3.-Crear EncuestaPersona
             * 4.-Crear EciOpinante
             */
            const cliente =request.input('cliente');
            const identificadores = identificadoresIn.toString().replace(/,/g , "'',''");

            const query =`exec getColaboradoresByIdentificador '''${identificadores}'''`;
            
            const result   = await data.execQueryMS(query);
         
            const inserts = Enumerable.from(result).select(function(persona){
                return `call eci_addPersona ('${idEncuesta}','${persona.identificador}','${persona.nombres}','${persona.ap_pat}','${persona.ap_mat}','${persona.genero}','${persona.email}','69e8753a-621c-11e8-8fb3-bc764e100f2b'); `;
            }).toArray();
            
            
            for(var i in inserts){
                
                var resultPersonas   = await data.execQuery(cliente,inserts[i]);
                //idsPersonas.push(resultPersonas[0][0][0].idPersona)
            }
          


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

module.exports = Encuesta