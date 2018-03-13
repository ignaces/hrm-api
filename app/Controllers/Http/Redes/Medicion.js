'use strict'
const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
const Env = use('Env')
var Enumerable = require('linq')
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
        //`MATCH(p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'}) return p`
        
        instrucciones.statements.push({
          statement : `MATCH path = (p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'})-[r]->(m) RETURN path`,
          resultDataContents:["graph"]
        })
       
        const apiExec = await got.post(`http://${neo4j}/db/data/transaction/commit`,
          {
            
            json:true,
            body: instrucciones,
            headers:{
              'Authorization': "Basic "+options_auth
            }      
          })
          
          var neoResponse = apiExec.body.results[0].data;

          var graph = {nodes:[],edges:[]};
          var nodos = [];
          var relaciones = [];
          for(var item in neoResponse){
              for(var nodo in neoResponse[item].graph.nodes){
                nodos.push(neoResponse[item].graph.nodes[nodo])      
              }
              for(var relacion in neoResponse[item].graph.relationships){
                relaciones.push(neoResponse[item].graph.relationships[relacion])      
              }
          }
          graph.nodes=Enumerable.from(nodos).distinct("$.id").select(function(nodo){
            return{
                id:nodo.id,
                tipo:nodo.labels,
                properties:nodo.properties
            }
            }).toArray();

          graph.edges=relaciones;
          response.json(graph)
  
      }
}
module.exports = Medicion

