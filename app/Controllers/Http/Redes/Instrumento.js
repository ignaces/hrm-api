'use strict'
const Database = use('Database')
const got = use('got')

class Instrumento {

   
    async preguntas({request,response}){
    
      const query = `select * from RedesPreguntas order by orden asc`;
      
      const usp   = await Database.connection('dev').schema.raw(query);
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      
      response.json(usp[0]);
    }
    
    async save ({request,response}){
      
      var options_auth = new Buffer("neo4j:ASmn1008").toString("base64")
      var data = request.all()
      var code = request.input("_code")
      
      delete data['_code']
      delete data['_csrf']
      
      const query = `select * from Persona where id ='${code}'`;
      
      const resPersona   = await Database.connection('dev').schema.raw(query);
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
        statement : `MERGE (p:Persona { codigo:'${code}' }) \
                    ON CREATE SET p.nombre = '${persona.nombres}', \
                    p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                    p.apellidoMaterno = '${persona.apellidoMaterno}' \
                    ON MATCH SET p.nombre = '${persona.nombres}', \
                    p.apellidoPaterno = '${persona.apellidoPaterno}' , \
                    p.apellidoMaterno = '${persona.apellidoMaterno}'`                      
     })
   
      for(var propertyName in data) {
        
            const qPreguntas = `select * from RedesPreguntas where id='${propertyName}'`;
            const preguntas   = await Database.connection('dev').schema.raw(qPreguntas);

            var pregunta = preguntas[0][0]

            if(data[propertyName].constructor === Array){
            for(var item in data[propertyName]){    
                  var qp = `select * from persona where id ='${data[propertyName][item]}'`
                  const resp   = await Database.connection('dev').schema.raw(qp);    

                  var pp = resp[0][0]
                  /**
                   * Se crea persona a la que se hace mención
                   */
                  instrucciones.statements.push({
                  statement : `MERGE (p:Persona { codigo:'${pp.id}' }) \
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

                  statement : `MATCH(pr:Persona {codigo:'${code}'}), (p:Persona {codigo:'${pp.id}'}) CREATE (pr)-[:${pregunta.relacion} {pregunta:'${propertyName}'}]->(p);`
                  })
          }
        }else{
            var qp = `select * from persona where id ='${data[propertyName]}'`
            const resp   = await Database.connection('dev').schema.raw(qp);    
            var pp = resp[0]
            /**
             * Se crea persona a la que se hace mención
             */

            instrucciones.statements.push({
            statement : `MERGE (p:Persona { codigo:'${pp.id}' }) \
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

              statement : `MATCH(pr:Persona {codigo:'${code}'}), (p:Persona {codigo:'${pp.id}'}) CREATE (pr)-[:${pregunta.relacion} {pregunta:'${propertyName}'}]->(p);`
            })
        }

      }
      
      
      
      const rPersonas = await got.post(`http://localhost:7474/db/data/transaction/commit`,
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
