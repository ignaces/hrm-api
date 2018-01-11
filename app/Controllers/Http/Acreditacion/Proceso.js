const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Proceso {

    async findProcesos({request,response}){

        const idCliente = request.input('idCliente');
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
    
    async getPersonas({request,response}){
    
        var idProceso = request.input("idProceso");
        
        const query = `call acre_getPersonasProceso('${idProceso}')`;
        const resultPersonas   = await Database.connection('dev').schema.raw(query);
        
        const personas = Enumerable.from(resultPersonas[0][0]).select(function(persona){
            return{
                idPersonaProceso:persona.idPersonaProceso,
                idPersona:persona.id,
                nombres:persona.nombres,
                apellidoPaterno:persona.apellidoPaterno,
                apellidoMaterno:persona.apellidoMaterno,
                identificador:persona.identificador,
                tiposInstrumentos:[
                    {id:"340f82f6-f0fa-11e7-bf12-bc764e100f2b",codigoInterno:"EIC",nombre:"Entrevista Insidentes Críticos",idCompetenciaTipo:"87ed8c12-f0e7-11e7-bf12-bc764e100f2b",idPersonaProceso:persona.idPersonaProceso},
                    {id:"342859c7-f0fa-11e7-bf12-bc764e100f2b",codigoInterno:"SOT",nombre:"Set de Observación en Terreno",idCompetenciaTipo:"87ed8c12-f0e7-11e7-bf12-bc764e100f2b",idPersonaProceso:persona.idPersonaProceso},
                    //{id:"9ff833c8-f0e7-11e7-bf12-bc764e100f2b",codigoInterno:"TCO",nombre:"Instrumento TCO 1",idCompetenciaTipo:"87d4b07c-f0e7-11e7-bf12-bc764e100f2b",idPersonaProceso:persona.idPersonaProceso}
                ]
                
            }
        }).toArray()
        

       
        
        return(personas);
    }


}

module.exports = Proceso
