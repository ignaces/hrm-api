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
        
        const query =`call acre_getFacsimilesPersona('${idProcesoPersona}')`;
        const rQuery =  await Database.connection('dev').schema.raw(query);
        const sinCrear = Enumerable.from(rQuery[0][0]).where(`$.IdPregruntaFacsimil==null`).count();
        const facsimiles = [];
        const instrumentos = rQuery[0][0];
        console.log(sinCrear);
        if(sinCrear>0){
            for(var facsimil in instrumentos){

                const fQuery = `call creaFacsimil('${instrumentos[facsimil].idEvaluacionInstrumento}','${instrumentos[facsimil].idDndProcesoPersonaPerfil}')`;
                const rFacsimil   = await Database.connection('dev').schema.raw(fQuery);
                facsimiles.push(rFacsimil[0][0])
            }
        }else{
            const fQuery = `select idEvaluacionFacsimil as idFacsimil from DndPersonaEvaluacion where idDndProcesoPersonaPerfil='${instrumentos[0].idDndProcesoPersonaPerfil}';`;
            const rFacsimil   = await Database.connection('dev').schema.raw(fQuery);
            facsimiles = rFacsimil;
        }
        
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