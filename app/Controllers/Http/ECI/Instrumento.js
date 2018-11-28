const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
/**
 *Esta clase ....
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
 }
 module.exports = Instrumento