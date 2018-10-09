'use strict'
const Database = use('Database')
var Enumerable = require('linq')
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
     
     
            
    var identificadores =  Enumerable.from(result[0][0]).select(function(persona){
                                return persona.identificador;
                            }).toArray();

    identificadores=identificadores.toString().replace(/,/g , "'',''");
    
    const queryCargados =`exec getColaboradoresByIdentificador '''${identificadores}'''`;

    const resultCargados   = await data.execQueryMS(queryCargados);
            
     var body = 
     {
       estado: {
         codigo: "",
         mensaje: ""
       },
       data:resultCargados
       
     }
     response.json(body);
    }catch(e){
      console.log(e);
      return null;
    }
     
 }
 async getEquipo({request,response}){
  try{
   const cliente =request.input('cliente');
   const idPersona =request.input('idPersona');
   
   
   const query = `select identificador from Persona where id='${idPersona}'`;
   
   const rPersona   = await data.execQuery(cliente,query);
   
   var identificador = rPersona[0][0].identificador;

       
  
  const queryEquipo =`exec getEquipoByLider '${identificador}'`;
console.log(queryEquipo)
  const rEquipo   = await data.execQueryMS(queryEquipo);
          
   var body = 
   {
     estado: {
       codigo: "",
       mensaje: ""
     },
     data:rEquipo
     
   }
   response.json(body);
  }catch(e){
    console.log(e);
    return null;
  }
   
}

    async addJustificacion({request,response}){
       
      try{
          const cliente =request.input('cliente');

          const idEncuesta =request.input('idEncuesta');
          const idPersona =request.input('idPersona');
          const mensaje =request.input('mensaje');
      
  
          var query     = `call eci_addJustificacion('${idEncuesta}','${idPersona}','${mensaje}')`;
          const result    = await data.execQuery(cliente,query);
          
          
          
          var body = 
          {
            estado: {
              codigo: "OK",
              mensaje: ""
            },
            data: result[0][0]
            
          }
          response.json(body);
      }catch(e){
          console.log(e)
          return null;
      }
      
      
     // return(body);
  } 
  async getJustificaciones({request,response}){
       
    try{
        const cliente =request.input('cliente');

        const idEncuesta =request.input('idEncuesta');
    

        var query     = `call eci_getJustificaciones('${idEncuesta}')`;
        const result    = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          },
          data: result[0][0]
          
        }
        response.json(body);
    }catch(e){
        console.log(e)
        return null;
    }
    
    
   // return(body);
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