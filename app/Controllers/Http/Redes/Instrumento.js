'use strict'
const Database = use('Database')
const got = use('got')
class Instrumento {
    async preguntas({request,response}){
    
      const query = `select * from RedesPreguntas order by orden asc`;
      
      const usp   = await Database.connection('local').schema.raw(query);
      
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
      
      const usp   = await Database.connection('local').schema.raw(query);
      console.log(usp[0])
      for(var propertyName in data) {
      
        console.log(propertyName,":",data[propertyName])
      }
      
      /*var query =`match(pp:Persona) where pp.identificador="123-5" 
                  create (pn:Persona{nombre:"Juanelo",identificador:"1w8934424-K"}),
                  (pn)-[:APRENDE_DE {pregunta:"idpregunta"}]->(pp)`
      */
      
    
      var nQuery = "MATCH (n) RETURN (n)"

      var statements ={
        
          statements:[
            {statement:nQuery}
          ]
        

      }

      const rPersonas = await got.post(`http://localhost:7474/db/data/transaction/commit`,
        {
          
          json:true,
          body: statements,
          headers:{
            'Authorization': "Basic "+options_auth
          }      
        })
        //console.log(rPersonas.body.results)
        return rPersonas.body

    }
}

module.exports = Instrumento
