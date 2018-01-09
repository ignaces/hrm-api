const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Instrumento {

   
    async creaFacsimil({request,response}){
    
      var id = request.input("idInstrumento");
      
      const query = `call creaFacsimil('${id}')`;
      const facsimil   = await Database.connection('dev').schema.raw(query);
      /**
       * 
       * Crear facsimil
       * retornar idFacsimil
       * 
       */
      response.json(facsimil[0][0]);
    }
    
    async getFacsimilesPersona({request,response}){
        var id = request.input("idCliente");
        var idProcesoPersona = request.input("idProcesoPersona");
        var codigoInstrumento = request.input("codigoInstrumento");
        
        const facsimiles = [
            {id:'866d2b50-f0f0-11e7-bf12-bc764e100f2b'},
            {id:'595299cc-ef15-11e7-80ab-a7d2274a0124'}
        ];

        response.json(facsimiles);
    }
    async getFacsimil({request,response}){
    
        var id = request.input("idFacsimil");
        
        const query = `call getPreguntasFacsimil('${id}')`;
        const preguntas   = await Database.connection('dev').schema.raw(query);
        
        const preguntasUnicas = Enumerable.from(preguntas[0][0]).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
            return{
                idPreguntaFacsimil:pregunta.IdPregruntaFacsimil,
                enunciado:pregunta.enunciado,
                correcto:pregunta.correcto,
                puntajeObtenido:pregunta.puntajeObtenido,
                puntajeEsperado:pregunta.puntajeEsperado,
                tipoPregunta:pregunta.tipoPregunta
            }
        })
        

        var facsimil = {
            nombre:preguntas[0][0][0].nombre,
            preguntas:preguntasUnicas.toArray()
        }
        for(var pregunta in facsimil.preguntas){
            var idPregunta = facsimil.preguntas[pregunta].idPreguntaFacsimil
            
            const alternativas = Enumerable.from(preguntas[0][0]).where(`$.IdPregruntaFacsimil == "${idPregunta}"`).select(function(alternativa){
                return{
                    id:alternativa.idAlternativa,
                    texto:alternativa.textoAlternativa,
                    puntaje:alternativa.puntajeAlternativa,
                    orden:alternativa.ordenAlternativa
                }
            }).toArray()
            facsimil.preguntas[pregunta].alternativas = alternativas
        }
        
        return(facsimil);
    }


}

module.exports = Instrumento