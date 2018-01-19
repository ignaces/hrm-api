const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
//jTest
class Proceso {

    async findProcesos({request,response}){

        const pagina = request.input('pagina');
        const registros = request.input('registros');
        const nombre = request.input('nombre');
        const activo = request.input('activo');
        
        
        const query = `call acre_findProcesos(${pagina}, ${registros},'${nombre}', ${activo})`;
        const result   = await Database.connection('dev').schema.raw(query);
        
        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: result[0][1][0],
          data: {procesos: result[0][0]}
          
        }
        response.json(body);
    }

    async putRespuesta({request,response}){
       
        var idOpinante = request.input("idOpinante");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");

        const query = `call acre_putRespuesta('${idOpinante}', '${idPregunta}','${idAlternativa}', '${justificacion}')`;
        const result   = await Database.connection('dev').schema.raw(query);
        
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
       

        const query = `call acre_cerrarEvaluacion('${idOpinante}')`;
        
        
        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);
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
    
    async getPersonasEvaluaciones({request,response}){
    
       
        var idProceso = request.input("idProceso");
        var idPersona = request.input("idPersona");
        const cliente =request.input('cliente') ;
        
        const qRoles =`call core_getRolPersona('${idPersona}')`;
        const rRoles   = await data.execQuery(cliente,qRoles);

        
       
        const tipoOpinantes = Enumerable.from(result[0][0]).distinct("$.idTipoOpinante").select(function(tipoOpinante){
            return{
                idTipoOpinante:tipoOpinante.idTipoOpinante,
                codigo:tipoOpinante.codigoTipoOpinante,
                orden:tipoOpinante.ordenTipoOpinante
            }
        }).toArray()

        const query = `call acre_getPersonasEvaluaciones('${idProceso}', '${idPersona}')`;
        const result   = await data.execQuery(cliente,query);
        var todo= true;
        if(rRoles[0][0].length==1 && rRoles[0][0][0].codigo=="USER"){
            todo=false; 
        }

        for(var tipoOpinante in tipoOpinantes){
            var idTipoOpinante = tipoOpinantes[tipoOpinante].idTipoOpinante
            if(!todo && tipoOpinantes[tipoOpinante].codigo=="DES"){
                tipoOpinantes.pop(tipoOpinantes[tipoOpinante])
                continue;
            }

            
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
                    return{
                        idOpinante:instrumento.idOpinante,
                        idTipoInstrumento:instrumento.idTipoInstrumento,
                        codigoTipoInstrumento:instrumento.codigoTipoInstrumento,
                        idEstado:instrumento.idEstado,
                        nombreEstado:instrumento.nombreEstado,
                        codigoEstado:instrumento.codigoEstado
                    }
                }).toArray()
                tipoOpinantes[tipoOpinante].personas[persona].instrumentos = instrumentos
            }
        }

        

        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: result[0][1][0],
          data: {tipoOpinante: tipoOpinantes}
          
        }
        response.json(body);
        

        return(body);
    }


}

module.exports = Proceso
