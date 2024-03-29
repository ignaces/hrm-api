const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
/**
 * /ECI/Instrumento
 * @constructor
 */
class Instrumento {
    
    async putRespuesta({request,response}){
        try{
             var idOpinante = request.input("idOpinante");
            var idPregunta = request.input("idPregunta");
            var idAlternativa = request.input("idAlternativa");
            var justificacion = request.input("justificacion");
            const cliente =request.input('cliente') ;
         
            const query = `call eci_putRespuesta('${idOpinante}', '${idPregunta}','${idAlternativa}', '${justificacion}')`;
             console.log(query);
             const result   = await data.execQuery(cliente,query);
       
            const body = 
            {
              estado: {
                codigo: "OK",
                mensaje: ""
              }
            }
            
            response.json(body);
        }catch(e){
            console.log(e);
        }
        
    }

    async getEncuestaInstruccion({request,response}){
        try{
            var idEncuesta = request.input("idEncuesta");
            const cliente =request.input('cliente') ;
         
            const query = `call eci_getEncuestaInstruccion('${idEncuesta}')`;
            const result   = await data.execQuery(cliente,query);
       
            var body = 
            {
                estado: {
                    codigo: "",
                    mensaje: ""
                },
                data: result[0][0]
            }
            response.json(body);

        }catch(e){
            console.log(e);
        }
        
    }
 }
 module.exports = Instrumento