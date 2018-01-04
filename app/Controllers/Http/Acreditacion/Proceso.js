const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Proceso {

   
    
    async getPersonas({request,response}){
    
        var idProceso = request.input("idProceso");
        
        const query = `call acre_getPersonasProceso('${idProceso}')`;
        const resultPersonas   = await Database.connection('dev').schema.raw(query);
        
        const personas = Enumerable.from(resultPersonas[0][0]).select(function(persona){
            return{
                idPersonaProceso:persona.idPersonaProceso,
                idPersona:persona.id,
                nombres:persona.nombres,
                apeliddoPaterno:persona.apeliddoPaterno,
                apellidoMaterno:persona.apellidoMaterno,
                identificador:persona.identificador,
                tiposInstrumentos:[
                    {id:"340f82f6-f0fa-11e7-bf12-bc764e100f2b",codigoInterno:"EIC",nombre:"Entrevista Insidentes Críticos",idCompetenciaTipo:"87ed8c12-f0e7-11e7-bf12-bc764e100f2b"},
                    {id:"342859c7-f0fa-11e7-bf12-bc764e100f2b",codigoInterno:"SOT",nombre:"Set de Observación en Terreno",idCompetenciaTipo:"87ed8c12-f0e7-11e7-bf12-bc764e100f2b"},
                    {id:"9ff833c8-f0e7-11e7-bf12-bc764e100f2b",codigoInterno:"TCO",nombre:"Instrumento TCO 1",idCompetenciaTipo:"87d4b07c-f0e7-11e7-bf12-bc764e100f2b"}]
                
            }
        }).toArray()
        

       
        
        return(personas);
    }


}

module.exports = Proceso
