'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
const dateformat = require('dateformat');
class Proceso {
    
    async getProcesos({request,response}){
       
        const cliente =request.input('cliente') ;
        
        const query = `call eci_getProcesos()`;
        
        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {procesos: result[0][0]}
          
        }
        response.json(body);
        

       // return(body);
    }

    async getProcesoCenco({request,response}){
       
        const cliente =request.input('cliente');
        const idProceso =request.input('idProceso');
        const idPersona =request.input('idPersona');
        
        const query = `call eci_getProcesoCenco('${idProceso}','${idPersona}')`;
        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {cenco: result[0][0]}
          
        }
        response.json(body);
       // return(body);
    }  

    async getProcesoCencoTipoEncuesta({request,response}){
       
        const cliente =request.input('cliente');
        const idProceso =request.input('idProceso');
        const idCenco =request.input('idCenco');
        const idPersona =request.input('idPersona');

        
        const query     = `call eci_getProcesoCencoTipoEncuesta('${idProceso}','${idCenco}', '${idPersona}')`;
        const result    = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {tipoEncuesta: result[0][0]}
          
        }
        response.json(body);
       // return(body);
    }  


    async updTipoEncuestaPorcentaje({request,response}){
       
        try{
            const cliente =request.input('cliente');
            const tipoEncuestas =request.input('tipoEncuesta');
            const idProceso =request.input('idProceso');
            const idPersona =request.input('idPersona');
            const idCenco =request.input('idCenco');
            
    
            for (var i = 0; i < tipoEncuestas.length; i++) {
                var idTipoEncuesta = tipoEncuestas[i].idTipoEncuesta;
                var activo =   (tipoEncuestas[i].estaActivo = 'true') ? 1 : 0;
                var porcentaje = tipoEncuestas[i].porcentaje;
                var query     = `call eci_updTipoEncuestaPorcentaje('${idProceso}','${idPersona}','${idCenco}','${idTipoEncuesta}', '${activo}', '${porcentaje}')`;
                const result    = await data.execQuery(cliente,query);
             
            }
            
            
            
            var body = 
            {
              estado: {
                codigo: "OK",
                mensaje: ""
              },
              data: {}
              
            }
            response.json(body);
        }catch(e){
            console.log(e)
            return null;
        }
        
        
       // return(body);
    } 

    async getOpinantes({request,response}){
        try{
         const cliente =request.input('cliente');
         const idProceso =request.input('idProceso');
         const idPersona =request.input('idPersona');
         
         const query = `call eci_getOpinantes('${idProceso}','${idPersona}')`;
         
         const result   = await data.execQuery(cliente,query);
         
          var opinantes = result[0][0]
         for(var item in opinantes){
            opinantes[item].fechaInicioEncuesta= dateformat(opinantes[item].fechaInicioEncuesta,"dd-mm-yyyy")
            opinantes[item].fechaTerminoEncuesta= dateformat(opinantes[item].fechaTerminoEncuesta,"dd-mm-yyyy")
         }
         var body = 
         {
           estado: {
             codigo: "",
             mensaje: ""
           },
           data: {opinante: opinantes}
           
         }
         response.json(body);
        }catch(e){
          console.log(e);
          return null;
        }
         
     }
     async isJefeCenco({request,response}){
      try{
       const cliente =request.input('cliente');
       const idPersona =request.input('idPersona');
       
       const query = `call eci_isJefeCenco('${idPersona}')`;
       
       const result   = await data.execQuery(cliente,query);
       
      
      
       var body = 
       {
         estado: {
           codigo: "",
           mensaje: ""
         },
         data: result[0][0][0]
         
       }
       response.json(body);
      }catch(e){
        console.log(e);
        return null;
      }
       
   }
    
    

    async addProcesoServicio({request,response}){
       
        try{
            const cliente =request.input('cliente');
            const idTipoEncuesta =request.input('idTipoEncuesta');
            const nombre =request.input('nombre');
            const descripcion =request.input('descripcion');
            const idProceso =request.input('idProceso');
            const idPersona =request.input('idPersona');
            const idCenco =request.input('idCenco');
        
        
    
            var query     = `call eci_addProcesoServicio('${idProceso}','${idPersona}','${idCenco}','${idTipoEncuesta}', '${nombre}', '${descripcion}')`;
            const result    = await data.execQuery(cliente,query);
        
        
            
            var body = 
            {
              estado: {
                codigo: result[0][0][0].codigo,
                mensaje: result[0][0][0].mensaje
              },
              data: {}
              
            }
            response.json(body);
        }catch(e){
            console.log(e)
            return null;
        }
        
        
       // return(body);
    } 

    
}

module.exports = Proceso