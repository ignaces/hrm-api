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
    async getLideresCenco({request,response}){
      try{
       const cliente =request.input('cliente');
       const idCenco =request.input('idCenco');
       const idPersona =request.input('idPersona');

       const qPersona = `select * from Persona where id='${idPersona}'`;
       const rPersona   = await data.execQuery(cliente,qPersona);
       
       const qCenco = `select * from EciCenco where id='${idCenco}'`;
       const rCenco   = await data.execQuery(cliente,qCenco);

       var qJefes = `exec eci_getCencoLideres '${rCenco[0][0].codigo}', '${rPersona[0][0].identificador}'`
      
      console.log(qJefes);

       const resultJefes    = await data.execQueryMS(qJefes);
       
       var body = 
       {
         estado: {
           codigo: "",
           mensaje: ""
         },
         data: resultJefes
         
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

async addJefaturaCenco({request,response}){   
  try{
      const cliente =request.input('cliente');

      const idPersona =request.input('idPersona');
      const cenco =request.input('cenco');
  
      var query     = `call eci_addJefaturaCenco('${idPersona}', '${cenco}')`;
      const result    = await data.execQuery(cliente,query);
      
      var body = 
      {
        estado: {
          codigo: "OK",
          mensaje: ""
        },
        data: result[0]
        
      }
      response.json(body);

      return body;
  }catch(e){
      console.log(e)
      return null;
  }
}

async updBackup({request,response}){
  
  try{
    const cliente =request.input('cliente');
    const idPersona =request.input('idPersona');
    const identificador =request.input('identificador');
    const idProceso =request.input('idProceso');

    var queryPersona = `select * from emp_usuario where identificador='${identificador}'`
    var resultPersona = await data.execQueryMS(queryPersona);
    var persona = resultPersona[0]
    
    const queryInPersona = `call pers_addPersona('${identificador}', '${persona.nombres}', '${persona.ap_pat}', '${persona.ap_mat}', '${persona.genero}', '${persona.email}','', 'cl','${persona.foto}')`;
    const resultIn = await data.execQuery(cliente,queryInPersona);

    const queryServicio = `call eci_updBackup('${idProceso}','${idPersona}', '${identificador}');`
    const resultServicio = await data.execQuery(cliente,queryServicio);

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

async getIsBackup({request,response}){
  
  try{
    const cliente =request.input('cliente');
    const idPersona =request.input('idPersona');
    const idProceso =request.input('idProceso');

    const queryServicio = `call eci_getIsBackup('${idProceso}','${idPersona}');`
    const resultServicio = await data.execQuery(cliente,queryServicio);

    var body = 
    {
      estado: {
        codigo: "OK",
        mensaje: ""
      },
      data: { personas : resultServicio[0][0]}
      
    }
    response.json(body);
}catch(e){
    console.log(e)
    return null;
}
// return(body);
}

async getBackup({request,response}){
  
  try{
    const cliente =request.input('cliente');
    const idPersona =request.input('idPersona');
    const idProceso =request.input('idProceso');

    const queryServicio = `call eci_getBackup('${idProceso}','${idPersona}');`
    
console.log(queryServicio);

    const result = await data.execQuery(cliente,queryServicio);


    var body = 
    {
      estado: {
        codigo: "OK",
        mensaje: ""
      },
      data: {backup: result[0][0]}
      
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
        const textoPreguntaAdicional1 =request.input('textoPreguntaAdicional1');
        const textoPreguntaAdicional2 =request.input('textoPreguntaAdicional2');
        const escala =request.input('escala');
    

        var query     = `call eci_addEncuesta('${idProceso}','${idPersona}','${idCenco}','${idServicio}', '${fechaInicio}', '${fechaTermino}',
         '${chkPreguntaAdicional}', '${textoPreguntaAdicional1}', '${escala}', '${textoPreguntaAdicional2}')`;
         

        const result    = await data.execQuery(cliente,query);
        
        
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
   
  } 
  async eliminarEncuestaCliente({request,response}){
       
    try{
        const cliente =request.input('cliente');
        const idEncuesta =request.input('idEncuesta');
                
        var query     = `call eci_eliminarEncuestaCliente('${idEncuesta}')`;
        const result    = await data.execQuery(cliente,query);

        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: ""
          
        }
        response.json(body);
    }catch(e){
        console.log(e)
        return null;
    }
  } 

  

    
}

module.exports = Jefe