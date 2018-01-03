const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Instrumento {

   
    async creaFacsimil({request,response}){
    
      var id = request.input("idInstrumento");
      
      const query = `call creaFacsimil('${id}')`;
      const facsimil   = await Database.connection('local').schema.raw(query);
      /**
       * 
       * Crear facsimil
       * retornar idFacsimil
       * 
       */
      response.json(facsimil[0][0]);
    }

    async getFacsimil({request,response}){
    
        var id = request.input("idFacsimil");
        
        const query = `call getPreguntasFacsimil('${id}')`;
        const preguntas   = await Database.connection('local').schema.raw(query);
        
        const preguntasUnicas = Enumerable.from(preguntas[0][0]).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
            return{
                IdPregruntaFacsimil:pregunta.IdPregruntaFacsimil,
                enunciado:pregunta.enunciado,
                correcto:pregunta.correcto,
                puntajeObtenido:pregunta.puntajeObtenido,
                puntajeEsperado:pregunta.puntajeEsperado
            }
        })
        

        var facsimil = {preguntas:preguntasUnicas.toArray()}
        for(var pregunta in facsimil.preguntas){
            var idPregunta = facsimil.preguntas[pregunta].IdPregruntaFacsimil
            
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