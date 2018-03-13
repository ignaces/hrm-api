'use strict'
const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
const Env = use('Env')
/**
 * asdasdadasdadasda
 * @class
 */
class Instrumento {

   
    /**
     * @param  cliente
     */
    async preguntas({request,response}){
      const idAplicacion = request.input("idAplicacion");
      const query = `call redes_getPreguntas('${idAplicacion}')`;
      const cliente =request.input('cliente') ;
      const usp   = await data.execQuery(cliente,query);
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      
      response.json(usp[0][0]);
    }
    
    async save ({request,response}){
      
      const cliente =request.input('cliente');
      
      var neo4j = Env.get('NEO4J', '192.168.3.18:7474');
      var neo4jUser = Env.get('NEO4J_USER', 'neo4j');
      var neo4jPassword = Env.get('NEO4J_PASSWORD', 'Qwerty123');
      
      var options_auth = new Buffer(`${neo4jUser}:${neo4jPassword}`).toString("base64")
      
      var rData = request.all();//("req");
      
      var code = rData._code;
      var idAplicacion = rData.idAplicacion;
      delete rData['_code']
      delete rData['_csrf']
      delete rData['cliente']
      delete rData['idAplicacion']
      
      const query = `select * from Persona where id ='${code}';`;
      
      const resPersona   = await data.execQuery(cliente,query);
      
      const persona = resPersona[0][0]

      
      /**
       * Get Preguntas
       */
      var idPersonas=""
      var instrucciones ={statements:[]}
      
      /**
       * Se crea persona que está contestando
       */
      instrucciones.statements.push({
        statement : `MERGE (p:Persona { codigo:'${code}',idAplicacion:'${idAplicacion}' }) \
                    ON CREATE SET p.nombre = '${persona.nombres}', \
                    p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                    p.apellidoMaterno = '${persona.apellidoMaterno}' \
                    ON MATCH SET p.nombre = '${persona.nombres}', \
                    p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                    p.apellidoMaterno = '${persona.apellidoMaterno}'`                      
      })
   
      for(var propertyName in rData) {
        
            const qPreguntas = `select * from RedesPreguntas where id='${propertyName}';`;
            const preguntas   = await data.execQuery(cliente,qPreguntas);

            var pregunta = preguntas[0][0]
            if(rData[propertyName].constructor === Array){
            for(var item in rData[propertyName]){    
                  var qp = `select * from Persona where id ='${rData[propertyName][item]}'`
                  const resp   = await data.execQuery(cliente,qp);  

                  var pp = resp[0][0]
                  /**
                   * Se crea persona a la que se hace mención
                   */
                  
                  instrucciones.statements.push({
                  statement : `MERGE (p:Persona { codigo:'${pp.id}',idAplicacion:'${idAplicacion}' }) \
                          ON CREATE SET p.nombre = '${pp.nombres}', \
                          p.apellidoPaterno = '${pp.apellidoPaterno}' , \
                          p.apellidoMaterno = '${pp.apellidoMaterno}' \
                          ON MATCH SET p.nombre = '${pp.nombres}', \
                          p.apellidoPaterno = '${pp.apellidoPaterno}' , \
                          p.apellidoMaterno = '${pp.apellidoMaterno}' \
                          `                      
                  })
                  /**
                   * Se crea relación entre las personass
                   */
                  instrucciones.statements.push({

                  statement : `MATCH(pr:Persona {codigo:'${code}',idAplicacion:'${idAplicacion}'}), (p:Persona {codigo:'${pp.id}',idAplicacion:'${idAplicacion}'}) CREATE (pr)-[:${pregunta.relacion} {pregunta:'${propertyName}'}]->(p);`
                  })
          }
        }else{
            var qp = `select * from Persona where id ='${rData[propertyName]}'`
            const resp   = await data.execQuery(cliente,qp);
            var pp = resp[0]
            /**
             * Se crea persona a la que se hace mención
             */

            instrucciones.statements.push({
            statement : `MERGE (p:Persona { codigo:'${pp.id}' ,idAplicacion:'${idAplicacion}'}) \
                      ON CREATE SET p.nombre = '${pp.nombres}', \
                      p.apellidoPaterno = '${pp.apellidoPaterno}' , \
                      p.apellidoMaterno = '${pp.apellidoMaterno}' \
                      ON MATCH SET p.nombre = '${pp.nombres}', \
                      p.apellidoPaterno = '${pp.apellidoPaterno}' , \
                      p.apellidoMaterno = '${pp.apellidoMaterno}' \
                      `                      
            })
            /**
             * Se crea relación entre las personass
             */
            instrucciones.statements.push({

              statement : `MATCH(pr:Persona {codigo:'${code}',idAplicacion:'${idAplicacion}'}), (p:Persona {codigo:'${pp.id}',idAplicacion:'${idAplicacion}'}) CREATE (pr)-[:${pregunta.relacion} {pregunta:'${propertyName}'}]->(p);`
            })
        }

      }
      
      
      
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

module.exports = Instrumento
