'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Jefe {
    
    async getProcesoServicio({request,response}){
       try{
        const cliente =request.input('cliente');
        const idProceso =request.input('idProceso');
        const idPersona =request.input('idPersona');
        const idCenco =request.input('idCenco');
        
        const query = `call eci_getProcesoServicio('${idProceso}','${idPersona}','${idCenco}')`;
        console.log(query);
        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {servicio: result[0][0]}
          
        }
        response.json(body);
       }catch(e){
         console.log(e);
         return null;
       }
        
        

       // return(body);
    }

    async getEncuestas({request,response}){
      try{
       const cliente =request.input('cliente');
       const idProceso =request.input('idProceso');
       const idPersona =request.input('idPersona');
       const idCenco =request.input('idCenco');
       
       const query = `call eci_getEncuestas('${idProceso}','${idCenco}','${idPersona}')`;
       console.log(query);
       const result   = await data.execQuery(cliente,query);
       
       var body = 
       {
         estado: {
           codigo: "",
           mensaje: ""
         },
         data: {encuesta: result[0][0]}
         
       }
       response.json(body);
      }catch(e){
        console.log(e);
        return null;
      }
       
   }

   async getEncuestaOpinantes({request,response}){
    try{
     const cliente =request.input('cliente');
     const idEncuesta =request.input('idEncuesta');
     
     
     const query = `call eci_getEncuestaOpinantes('${idEncuesta}')`;
     
     const result   = await data.execQuery(cliente,query);
     
     var body = 
     {
       estado: {
         codigo: "",
         mensaje: ""
       },
       data: {opinantes: result[0][0]}
       
     }
     response.json(body);
    }catch(e){
      console.log(e);
      return null;
    }
     
 }

    async addEncuesta({request,response}){
       
      try{
          const cliente =request.input('cliente');

          const idProceso =request.input('idProceso');
          const idPersona =request.input('idPersona');
          const idCenco =request.input('idCenco');

          const idServicio =request.input('idServicio');
          const fechaInicio =request.input('fechaInicio');
          const fechaTermino =request.input('fechaTermino');
          const chkPreguntaAdicional =request.input('chkPreguntaAdicional');
          const textoPreguntaAdicional =request.input('textoPreguntaAdicional');
          const escala =request.input('escala');
      
  
          var query     = `call eci_addEncuesta('${idProceso}','${idPersona}','${idCenco}','${idServicio}', '${fechaInicio}', '${fechaTermino}',
           '${chkPreguntaAdicional}', '${textoPreguntaAdicional}', '${escala}')`;
          const result    = await data.execQuery(cliente,query);
          
          console.log(query);
          
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

    
}

module.exports = Jefe