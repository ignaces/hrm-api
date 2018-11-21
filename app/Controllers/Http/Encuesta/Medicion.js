'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');
/**
 * Medicion
 * @class
 */
class Medicion {

    

    async validarCodigo({request,response}){
        
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")  ;
        var codigo = request.input("codigo");
        const cliente =request.input('cliente') ;
        const query =`call encu_getEncuestaPersona('${idEncuestaAplicacion}','${codigo}')`;

        const result   = await data.execQuery(cliente,query);
        var validacion ={};
        
        validacion.mensaje="";
        if(!result[0][0][0]){
            validacion.continua = false;
            validacion.mensaje="No existe el código ingresado"
        }else{
            validacion.encuestaPersona= result[0][0][0];
            var inicio = new Date(validacion.encuestaPersona.fechaInicio)
            var fin = new Date(validacion.encuestaPersona.fechaTermino)
            var hoy = Date.now();
            var activo = hoy > inicio && hoy < fin;
            console.log(activo)
            if(!activo){
                validacion.mensaje="La encuesta no está activa para ser contestada"
                validacion.continua=false;
            }else{
                if(validacion.encuestaPersona.codigo == "FINALIZADO"){
                    validacion.mensaje="La encuesta para este código ya fue contestada"
                    validacion.continua=false;
                }else{
                    validacion.continua=true;
                }
            }
            
            
            
           
        }

        response.json(validacion);
    }

    async getListaEncuesta({request,response}){
        
        var idPersona = request.input("idPersona")  ;
        
        const cliente =request.input('cliente') ;
        const query =`call encuesta_getListaEncuesta('${idPersona}')`;

        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: result[0][0]
          
        }
        response.json(body);
    }

    async getPersona({request,response}){
        
        var idPersona = request.input("idPersona")  ;
        
        const cliente =request.input('cliente') ;
        const query =`call encuesta_getPersona('${idPersona}')`;

        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: result[0][0]
          
        }
        response.json(body);
    }

    async getPreguntasAdicionales({request, response}){
        var idPersona = request.input("idPersona");
        var idEncuesta = request.input("idEncuesta");

        var instrumento = [];
        const cliente = request.input('cliente');
        const query = `call eci_getPreguntasAdicionales('${idPersona}', '${idEncuesta}')`;
        const preguntas = await data.execQuery(cliente,query);

        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: preguntas[0][0]
          
        }
        response.json(body);
    }

    async postPreguntasAdicionales({request, response}){
        // var idOpinante = request.input('');
        // var idEncuestaPregunta = request.input('');
        // var texto = request.input('');

        const cliente = request.input('cliente');
        console.log('cliente: ' + cliente);
        var query = `call eci_addRespuestaAdicionales('86cde995-dd04-11e8-80db-bc764e10787e','7546dd79-db91-11e8-80db-bc764e10787e','texto')`;
        //const query = `call eci_addRespuestaAdicionales('${idOpinante}','${idEncuestaPregunta}','${texto}')`;
        const resp = await data.execQuery(cliente, query);

        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: "",
          data: resp[0][0]
          
        }
        console.log('************************************');
        console.log('body: ' + body);
        console.log('************************************');
        response.json(body);
    }
    
    async getInstrumento({request,response}){
        
        var idEncuestaPersona = request.input("idEncuestaPersona");
        
        var instrumento = [];
        const cliente =request.input('cliente') ;
        
        
   
            const query =`call encuesta_getInstrumento('${idEncuestaPersona}')`;
            const preguntas   = await data.execQuery(cliente,query);
           
            const dimensiones = Enumerable.from(preguntas[0][0]).distinct("$.dimensionCodigo").select(function(dimension){
                return{
                    id:dimension.dimensionCodigo,
                    nombre:dimension.dimension,
                    descripcion:dimension.dimensionDescripcion

                }
            })
            instrumento = {
                nombre:preguntas[0][0][0].nombre,
                preguntasPagina:preguntas[0][0][0].preguntasPagina,
                paginar:preguntas[0][0][0].paginar,
                tipoInstrumento:"ENC",
                dimensiones:dimensiones.toArray(),
                idFacsimil:preguntas[0][0][0].idFacsimil
            }

            for(var dimension in instrumento.dimensiones){
                var idDimension = instrumento.dimensiones[dimension].id;
                
                
                
                const preguntasUnicas = Enumerable.from(preguntas[0][0]).where(`$.dimensionCodigo == "${idDimension}"`).distinct("$.IdPregruntaFacsimil").select(function(pregunta){
                    return{
                        id:pregunta.IdPregruntaFacsimil,
                        enunciado:pregunta.enunciado,
                        correcto:pregunta.correcto,
                        puntajeObtenido:pregunta.puntajeObtenido,
                        puntajeEsperado:pregunta.puntajeEsperado,
                        tipoPregunta:pregunta.tipoPregunta,
                        tipoDespliegue:pregunta.despliegue,
                        codigoDespliegue:pregunta.codigoDespliegue,
                        orden:pregunta.ordenPregunta,
                        respuestaTexto:pregunta.respuestaTexto,
                        codigoPregunta:pregunta.codigoPregunta
                    }
                }).toArray();
                
               // instrumento.dimensiones[dimension].preguntas = preguntasUnicas.toArray();
               instrumento.dimensiones[dimension].paginas=[]
               var preguntasPagina=[];
               var numpagina = 1;
                for(var pregunta in preguntasUnicas){
                    var idPregunta = preguntasUnicas[pregunta].id
                    
                    const alternativas = Enumerable.from(preguntas[0][0]).where(`$.IdPregruntaFacsimil == "${idPregunta}"`).select(function(alternativa){
                        return{
                            id:alternativa.idAlternativa,
                            texto:alternativa.textoAlternativa,
                            puntaje:alternativa.puntajeAlternativa,
                            orden:alternativa.ordenAlternativa,
                            estaSeleccionada:alternativa.estaSeleccionada,
                            requiereJustificacion:alternativa.requiereJustificacion,
                            justificacion: alternativa.justificacion,
                            instruccionJustificacion: alternativa.instruccionJustificacion
                        }
                    }).toArray()
                    preguntasUnicas[pregunta].alternativas = alternativas

                    if(preguntasPagina.length<instrumento.preguntasPagina){
                        preguntasPagina.push(preguntasUnicas[pregunta])
                    }else{
                        instrumento.dimensiones[dimension].paginas.push({idPagina:`${instrumento.dimensiones[dimension].id}_${numpagina}`,preguntas:preguntasPagina})
                        numpagina++;
                        preguntasPagina = [];
                        preguntasPagina.push(preguntasUnicas[pregunta])
                    }
                }//fin for preguntasunicas
                instrumento.dimensiones[dimension].paginas.push({idPagina:`${instrumento.dimensiones[dimension].id}_${numpagina}`,preguntas:preguntasPagina})

            }
         
        response.json(instrumento);
    }
}
module.exports = Medicion