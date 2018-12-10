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

async updLiderServicio({request,response}){
  console.log()
  try{
    const cliente =request.input('cliente');
    const idServicio =request.input('idServicio');
    const identificador =request.input('identificador');
    

    var queryPersona = `select * from emp_usuario where identificador='${identificador}'`
    var resultPersona = await data.execQueryMS(queryPersona);
    var persona = resultPersona[0]
    
    const queryInPersona = `call pers_addPersona('${identificador}', '${persona.nombres}', '${persona.ap_pat}', '${persona.ap_mat}', '${persona.genero}', '${persona.email}','', 'cl','${persona.foto}')`;
    
    const resultIn = await data.execQuery(cliente,queryInPersona);

    const queryServicio = `call eci_updLiderServicio('${idServicio}','${identificador}');`
    
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
    async updTipoEncuestaPorcentaje({request,response}){
       
        try{
            const cliente =request.input('cliente');
            const tipoEncuestas =request.input('tipoEncuesta');
            const idProceso =request.input('idProceso');
            const idPersona =request.input('idPersona');
            const idCenco =request.input('idCenco');

            var queryDel     = `call eci_deleteTipoEncuestaPorcentaje('${idProceso}','${idPersona}','${idCenco}')`;

            console.log(queryDel)
                const resultDel    = await data.execQuery(cliente,queryDel);
            
            for (var i = 0; i < tipoEncuestas.length; i++) {
                var idTipoEncuesta = tipoEncuestas[i].idTipoEncuesta;

console.log(tipoEncuestas[i].estaActivo);

                var activo =   (tipoEncuestas[i].estaActivo == 'true') ? 1 : 0;

                console.log(activo);
                if(activo == 1)
                {
                    console.log("ette");
                  var porcentaje = tipoEncuestas[i].porcentaje;
                var query     = `call eci_updTipoEncuestaPorcentaje('${idProceso}','${idPersona}','${idCenco}','${idTipoEncuesta}', '${activo}', '${porcentaje}')`;
                const result    = await data.execQuery(cliente,query);
                }
                
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

    async getEstadoOpinantes({request,response}){
      try{
        const cliente =request.input('cliente');
        const idProceso =request.input('idProceso');
        const idPersona =request.input('idPersona');
         
        const query = `call sp_obtenerEstadoOpinantes('${idProceso}','${idPersona}')`;
         
        const result   = await data.execQuery(cliente,query);
         
        var opinantes = result[0][0]

        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {opinante: opinantes}
           
        }
        //console.log(body);
        response.json(body);
      }catch(e){
        console.log(e);
        return null;
      }
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
         //console.log(body);
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
            var codigo="0";
            var mensaje="";
            
            const qCenco = `select * from EciCenco where id='${idCenco}'`;
            const rCenco   = await data.execQuery(cliente,qCenco);

            const qPersona = `select * from Persona where id='${idPersona}'`;
            const rPersona   = await data.execQuery(cliente,qPersona);

            

            var qJefes = `exec eci_getCencoLideres '${rCenco[0][0].codigo}', '${rPersona[0][0].identificador}'`
            const resultJefes    = await data.execQueryMS(qJefes);

            
            
            const qServicios   = `call eci_getProcesoServicio('${idProceso}','${idPersona}','${idCenco}')`;
            const rServicios   = await data.execQuery(cliente,qServicios);
            
            var servicios = rServicios[0][0].length;
            
            
          
            if(resultJefes.length <= servicios){
                codigo ="2";
                mensaje=`No se puede crear el servicio por qué existen ${resultJefes.length} lideres en este cenco y ya hay ${servicios} servicios creados.`;
            }else{
                var query     = `call eci_addProcesoServicio('${idProceso}','${idPersona}','${idCenco}','${idTipoEncuesta}', '${nombre}', '${descripcion}')`;
                const result    = await data.execQuery(cliente,query);
                codigo = result[0][0][0].codigo;
                mensaje = result[0][0][0].mensaje;
            }
            
            
        
            
            var body = 
            {
              estado: {
                codigo: codigo,
                mensaje: mensaje
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

    async updProcesoServicio({request,response}){
       
      try{
          const cliente =request.input('cliente');
          
          const nombre =request.input('nombre');
          const descripcion =request.input('descripcion');
          const idServicio =request.input('idServicio');
                  
          var query     = `call eci_updProcesoServicio('${idServicio}','${nombre}','${descripcion}')`;
          const result    = await data.execQuery(cliente,query);

          var body = 
          {
            estado: {
              codigo: "",
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

  async getServicio({request,response}){
       
    try{
        const cliente =request.input('cliente');
        
        const idServicio =request.input('idServicio');
                
        var query     = `call eci_getServicio('${idServicio}')`;
        const result    = await data.execQuery(cliente,query);

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
        console.log(e)
        return null;
    }
  } 

  async existeBackup({request,response}){
    try{
        //console.log(cliente);
        const idPersona = request.input('idPersona');
        const cliente =request.input('cliente');
        
        const query =`call user_getUserByIdPersona('${idPersona}')`;
        const respuesta   = await data.execQuery(cliente,query);
        //console.log(query)
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    } catch(e){
        console.log(e);
        return null;
    }     
  }

  async cerrarEvaluacion({request,response}){
                                        
    var idOpinante = request.input("idOpinante");
    const cliente =request.input('cliente') ;
    const query = `call eci_cerrarEvaluacion('${idOpinante}')`;
    const result   = await data.execQuery(cliente,query);
    
    const body = 
    {
      estado: {
        codigo: "OK",
        mensaje: ""
      }
      
    }
    response.json(body);
}

    
}

module.exports = Proceso