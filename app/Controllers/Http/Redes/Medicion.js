'use strict'
const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
const Env = use('Env')
/**
 * asdasdadasdadasda
 * @class
 */
class Medicion {

    async getPersonas({request,response}){
        const idAplicacion = request.input("idAplicacion");
        const query = `call redes_getPersonas('${idAplicacion}')`;
        const cliente =request.input('cliente') ;
        const usp   = await data.execQuery(cliente,query);
        
        //const usp   = yield Database.schema.raw("SELECT * from users;");
        //response.json(usp[0]);
        
        response.json(usp[0][0]);
    }
    async getGraph ({request,response}){
        const cliente =request.input('cliente');
        var neo4j = Env.get('NEO4J', '192.168.3.18:7474');
        var neo4jUser = Env.get('NEO4J_USER', 'neo4j');
        var neo4jPassword = Env.get('NEO4J_PASSWORD', 'Qwerty123');
        var options_auth = new Buffer(`${neo4jUser}:${neo4jPassword}`).toString("base64")
        
  
        
        /**
         * Get Preguntas
         */
        var idPersonas=""
        var instrucciones ={statements:[]}
        
        /**
         * Se crea persona que está contestando
         */
        instrucciones.statements.push({
          statement : `MERGE (p:Persona { codigo:'${code}' }) \
                      ON CREATE SET p.nombre = '${persona.nombres}', \
                      p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                      p.apellidoMaterno = '${persona.apellidoMaterno}' \
                      ON MATCH SET p.nombre = '${persona.nombres}', \
                      p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                      p.apellidoMaterno = '${persona.apellidoMaterno}'`                      
        })
     
        const rPersonas = await got.post(`http://${neo4j}/db/data/transaction/commit`,
          {
            
            json:true,
            body: instrucciones,
            headers:{
              'Authorization': "Basic "+options_auth
            }      
          })
          //console.log(rPersonas.body.results)
          return rPersonas.body
  
      }
}
module.exports = Medicion

