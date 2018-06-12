const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
/**
 *Esta clase ....
 * @constructor
 */
class Proceso {
    /**
     * Esta funcion blah blah
     * @param  {string} pagina pagina
     * @param  registros
     * @param  nombre
     * @param  activo
     * @param  cliente
     */
    async findProcesos({request,response}){

        const pagina = request.input('pagina');
        const registros = request.input('registros');
        const nombre = request.input('nombre');
        const activo = request.input('activo');
        const cliente =request.input('cliente') ;
        const query = `call acre_findProcesos(${pagina}, ${registros},'${nombre}', ${activo})`;
        const result   = await data.execQuery(cliente,query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: result[0][1][0],
          data: {
              procesos: result[0][0]
          }
          
        }
        response.json(body);
    }
    /**
     * @param  {string} cliente
     * @param  {} idOpinante 
     * @param  {} idPregunta
     * @param  {} idAlternativa
     * @param  {} justificacion
     */
    async putRespuesta({request,response}){
       
        var idOpinante = request.input("idOpinante");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");
        const cliente =request.input('cliente') ;
        const query = `call acre_putRespuesta('${idOpinante}', '${idPregunta}','${idAlternativa}', '${justificacion}')`;
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

    async cerrarEvaluacion({request,response}){
        
        var idOpinante = request.input("idOpinante");
        const cliente =request.input('cliente') ;
        const query = `call acre_cerrarEvaluacion('${idOpinante}')`;
        const result   = await data.execQuery(cliente,query);
        
        const query2 = `call acre_calculaResultado('${idOpinante}')`;
        const result2   = await data.execQuery(cliente,query2);
        
        
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);
    }

    async testGet({request,response}){
        const query = `call test_getPersonas()`;
        const result   = await Database.connection('dev').schema.raw(query);
        response.json(result[0][0]);
    }

    async test({request,response}){
        
        var id = request.input("valor");
       
        
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": id
        });
    }
    async getProcesos({request,response}){
        var idProceso = request.input("idProceso");

        var activo = 1;

        if(request.input("activo"))
        {
            activo = request.input("activo");
        }
        //console.log(activo);
        const cliente =request.input('cliente') ;
        
        const query = `call acre_getProcesos('${idProceso}', ${activo})`;
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

    async getPersonasEvaluaciones({request,response}){
    
       
        var idProceso = request.input("idProceso");
        var idPersona = request.input("idPersona");
        const cliente =request.input('cliente') ;
        /*
        const qRoles =`call core_getRolPersona('${idPersona}')`;
        const rRoles   = await data.execQuery(cliente,qRoles);

        var tipo= "";
        
        if(rRoles[0][0].length==1 && rRoles[0][0][0].codigo=="USER"){
            tipo="AUTO";
        }else{
            tipo="DES";
        }*/

        
        const query = `call acre_getPersonasEvaluaciones('${idProceso}', '${idPersona}')`;
        
        const result   = await data.execQuery(cliente,query);
        const tipoOpinantes = Enumerable.from(result[0][0]).distinct("$.idTipoOpinante").select(function(tipoOpinante){
            return{
                idTipoOpinante:tipoOpinante.idTipoOpinante,
                codigo:tipoOpinante.codigoTipoOpinante,
                orden:tipoOpinante.ordenTipoOpinante
            }
        }).toArray()

        
        var avance = 0.0;
        var total =0;
        var finalizados = 0;
        for(var tipoOpinante in tipoOpinantes){
            var idTipoOpinante = tipoOpinantes[tipoOpinante].idTipoOpinante
            
            const personas = Enumerable.from(result[0][0]).where(`$.idTipoOpinante == "${idTipoOpinante}"`).distinct("$.idPersona").select(function(persona){
                return{
                    id:persona.idPersona,
                    nombres:persona.nombres,
                    apellidoPaterno:persona.apellidoPaterno,
                    apellidoMaterno:persona.apellidoMaterno,
                    identificador:persona.identificador
                }
            }).toArray()
            
            tipoOpinantes[tipoOpinante].personas = personas

            for(var persona in personas){
                var idPersona = personas[persona].id
                
                const instrumentos = Enumerable.from(result[0][0]).where(`$.idPersona == "${idPersona}"`).select(function(instrumento){
                    if(instrumento.codigoEstado=="FINALIZADO"){
                        finalizados += 1;
                    }
                   
                        total += 1;
                   

                    return{
                        idOpinante:instrumento.idOpinante,
                        idTipoInstrumento:instrumento.idTipoInstrumento,
                        codigoTipoInstrumento:instrumento.codigoTipoInstrumento,
                        idEstado:instrumento.idEstado,
                        nombreEstado:instrumento.nombreEstado,
                        codigoEstado:instrumento.codigoEstado,
                        accesible:instrumento.accesible,
                        nombreInstrumento:instrumento.nombreInstrumento
                    }
                }).toArray()
                tipoOpinantes[tipoOpinante].personas[persona].instrumentos = instrumentos
            }
        }
        if(total>0){
            avance = (finalizados*100)/total;
            avance = avance.toFixed(2);
        }
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: result[0][1][0],
          data: {tipoOpinante: tipoOpinantes,avance:avance}
          
        }
        response.json(body);
       

        return(body);
    }

    async getPersonas({request,response}){
        var idProceso = request.input("idProceso");

        const cliente =request.input('cliente') ;
        
        const query = `call acre_getPersonasProceso('${idProceso}')`;
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

    async getPersonaProceso({request,response}){
        var idPersonaProceso = request.input("idPersonaProceso");

        const cliente =request.input('cliente') ;
        
        var query = `call acre_getPersonaProceso('${idPersonaProceso}')`;
        const resultPersona   = await data.execQuery(cliente,query);
        
        query = `call acre_getInstrumentosProceso('${idPersonaProceso}')`;
        const resultInstrumentos   = await data.execQuery(cliente,query);
        
       

        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {personaProceso: resultPersona[0][0], instrumentosProceso: resultInstrumentos[0][0], instrumentosProcesoEvaluado: resultInstrumentos[0][1]}
          
        }
        response.json(body);
        

       // return(body);
    }

    async setOpinanteEvaluado({request, response})
    {
        var idDndOpinante = request.input("idDndOpinante");
        var idPersona = request.input("idPersona");
        const cliente =request.input('cliente') ;
        
        const query = `call acre_setOpinanteEvaluado('${idDndOpinante}', '${idPersona}')`;
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
    }

    async getPersonasFueraDelProceso({request,response}){
        var idProceso = request.input("idProceso");

        const cliente =request.input('cliente');
        
        const query = `call acre_getPersonasFueraDelProceso('${idProceso}')`;
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

    //VA AQUI O EN UN CONTROLLER DE COMPETENCIAS?
    async getPerfilesProceso({request,response}){
        var idProceso = request.input("idProceso");

        const cliente =request.input('cliente') ;
        
        const query     = `call acre_getPerfilesProceso('${idProceso}')`;

        const result    = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {perfiles: result[0][0]}
          
        }
        response.json(body);
        

       // return(body);
    }

    async addPersonaProceso({request,response}){
        //console.log(request.all());
        var idProceso = request.input("idProceso");
        var personas = request.input("personas");
        var idPerfil = request.input("idPerfil");

        const cliente =request.input('cliente');
        


        for(var i=0; i<personas.length; i++){
            
            var idPersona   = personas[i].idPersona;
        
            const query     = `call acre_addPersonaProceso('${idPersona}', '${idProceso}', '${idPerfil}')`;
            const result    = await data.execQuery(cliente,query);
            
        }

        for(var i=0; i<personas.length; i++){
            
            var idPersona   = personas[i].idPersona;
        
            const query     = `call acre_addPersonaProceso('${idPersona}', '${idProceso}', '${idPerfil}')`;
            const result    = await data.execQuery(cliente,query);
            
        }

        var body = 
            {
            estado: {
                codigo: "",
                mensaje: ""
            },
            data: {}
            
            }

            response.json(body);
    }

    async getPersona({request,response}){
    
        var procesoPersona = "";
        var proceso = "";
        var persona = "";
        
        const cliente = request.input('cliente');

        if(request.input('procesoPersona'))
        {
            procesoPersona = request.input('procesoPersona');
        }
        else{
            proceso = request.input('idProceso');
            persona = request.input('idPersona');
        }
        
        const query =  `call acre_getPersona('${procesoPersona}','${proceso}','${persona}')`;
        //const query =  `call pers_getClasificacion('${idPersona}')`;
        const usp   = await data.execQuery(cliente,query);
       
        
       if(usp[0]==undefined){
           return response.json({})
       }
       if (usp[0][0][0]==undefined){
        return response.json({})
       }
        
        
        var persona = {
            identificador:usp[0][0][0].identificador,
            nombres:usp[0][0][0].nombres,
            apellidoPaterno:usp[0][0][0].apellidoPaterno,
            apellidoMaterno:usp[0][0][0].apellidoMaterno,
            email: usp[0][0][0].email,
            clasificaciones:""    
        };
       
      
      response.json(persona);
      
    }

}

module.exports = Proceso
