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
    async getEncuestasColaborador({request,response}){
        try{
         const cliente =request.input('cliente');
         const idProceso =request.input('idProceso');
         const identificador =request.input('identificador');
         
         const query = `call eci_getEncuestasColaborador('${idProceso}','${identificador}')`;
         
         const result   = await data.execQuery(cliente,query);
         
         var body = 
         {
           estado: {
             codigo: "",
             mensaje: ""
           },
           data:  result[0][0]
           
         }
         response.json(body);
        }catch(e){
          console.log(e);
          return null;
        }
         
     }
     async setEstado({request,response}){
        try{
         const cliente =request.input('cliente');
         const idEncuesta =request.input('idEncuesta');
         var estado =request.input('estado');
         
         switch(estado){
             case "A":
                estado = "APROV";
             break;

             case "B":
                estado="REJECT";
             break;

             case "E":
                estado="VALIDACION";
             break;
         }
         
         const query = `call eci_setEstadoEncuesta('${idEncuesta}','${estado}')`;
         
         const result   = await data.execQuery(cliente,query);
         
         var body = 
         {
           estado: {
             codigo: "",
             mensaje: ""
           },
           data:  result[0][0]
           
         }
         response.json(body);
        }catch(e){
          console.log(e);
          return null;
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
            var identificadores = identificadoresIn.toString().replace(/,/g , "'',''");

            const query =`exec getColaboradoresByIdentificador '''${identificadores}'''`;
            
            const result   = await data.execQueryMS(query);
         
            const inserts = Enumerable.from(result).select(function(persona){
                return `call eci_addPersona ('${idEncuesta}','${persona.identificador}','${persona.nombres}','${persona.ap_pat}','${persona.ap_mat}','${persona.genero}','${persona.email}','69e8753a-621c-11e8-8fb3-bc764e100f2b'); `;
            }).toArray();
            
            
            for(var i in inserts){
                
                var resultPersonas   = await data.execQuery(cliente,inserts[i]);
                //idsPersonas.push(resultPersonas[0][0][0].idPersona)
            }
            const queryOpinantes = `call eci_getEncuestaOpinantes('${idEncuesta}')`;
            
            const resultOpinantes   = await data.execQuery(cliente,queryOpinantes);
            
            identificadores =  Enumerable.from(resultOpinantes[0][0]).select(function(persona){
                                        return persona.identificador;
                                    }).toArray();

                                    identificadores=identificadores.toString().replace(/,/g , "'',''");
            const queryCargados =`exec getColaboradoresByIdentificador '''${identificadores}'''`;

            const resultCargados   = await data.execQueryMS(queryCargados);

            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": resultCargados
            });

        } catch (e) {


console.log(e.message)
            
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