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
        const idRedesPersona = request.input("idRedesPersona");
        const query = `call redes_getPersonas('${idRedesPersona}')`;
        
        const cliente =request.input('cliente');
        
        const usp   = await data.execQuery(cliente,query);
        
        //const usp   = yield Database.schema.raw("SELECT * from users;");
        //response.json(usp[0]);
        response.json(usp[0][0]);
    }

    async getAplicaciones({request,response}){
      const query = `call redes_getAplicaciones()`;
      
      const cliente =request.input('cliente');
      
      const usp   = await data.execQuery(cliente,query);
      var aplicaciones = {};
      aplicaciones.apps = usp[0][0];

      response.json(aplicaciones);
  }

  async getPreguntas({request,response}){
    
    const cliente =request.input('cliente');
    var idAplicacion = request.input("idAplicacion");

    const query = `call redes_getFiltroPreguntas('`+idAplicacion+`')`;

    const usp   = await data.execQuery(cliente,query);
    var preguntas = {};
    preguntas.preguntas = usp[0][0];

    response.json(preguntas);
  }
  
    async getGraph ({request,response}){
        const cliente =request.input('cliente');
        var neo4j = Env.get('NEO4J', '192.168.3.18:7474');
        var neo4jUser = Env.get('NEO4J_USER', 'neo4j');
        var neo4jPassword = Env.get('NEO4J_PASSWORD', 'Qwerty123');
        var options_auth = new Buffer(`${neo4jUser}:${neo4jPassword}`).toString("base64")
        
        var idAplicacion = request.input("idAplicacion");

        if(idAplicacion == "undefined")
        {
          idAplicacion = "4771dc31-2621-11e8-80db-bc764e10787e";
        }
        //console.log(request.all());
        
        /**
         * Get Preguntas
         */
        var idPersonas=""
        var instrucciones ={statements:[]}
        
        /**
         * Se crea persona que está contestando
         */
        //`MATCH(p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'}) return p`
        var conoce = "";
        var conocido = "";
        var idAplicacion = request.input("idAplicacion")
        
        var stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"'})-[r]-(m) WHERE p.codigo <> 'undefined' AND m.codigo <> 'undefined' RETURN path";
        //stmnt = "MATCH path = (p:Persona{idAplicacion:'5d2a6173-2917-11e8-80db-bc764e10787e'})<-[:considera_involucrada_cambio]->(r)<-[:discute_ideas_con]->(m)<-[:considera_referente]->(o)  RETURN path";
        /*
        if(request.input("id") && request.input("id")!=0)
        {
          stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"'})<-[r]->(m) WHERE p.codigo = '"+request.input("id")+"' RETURN path";
        
          if(request.input("sentido") == 1)
          {
            stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"'})<-[r]-(m) WHERE p.codigo = '"+request.input("id")+"' RETURN path";
          }

          if(request.input("sentido") == 2)
          {
            stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"'})-[r]->(m) WHERE p.codigo = '"+request.input("id")+"' RETURN path";
          }
        }
        */
        
        var desdePersona = "";
        var conRelacion = "r";
        var conSentido1 = "-";
        var conSentido2 = "-";

        if(request.input("id") && request.input("id")!=0)
        {
            desdePersona = ",codigo:'"+request.input("id")+"'";
        }

        if(request.input("relacion") && request.input("relacion")!=0)
        {
            conRelacion = ":"+request.input("relacion");
        }

        if(request.input("sentido") == 1)
        { 
            conSentido1 = "<-";
        }

        if(request.input("sentido") == 2)
        { 
            conSentido2 = "->";
        }

        stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"' "+desdePersona+"})"+conSentido1+"["+conRelacion+"]"+conSentido2+"(m) WHERE p.codigo <> 'undefined' AND m.codigo <> 'undefined' RETURN path";
        console.log(stmnt);

        //console.log(stmnt);
        instrucciones.statements.push({
          //statement : `MATCH path = (p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'})<-[r]->(m) WHERE (p.nombre = 'Jonathan' AND p.apellidoPaterno = 'Olivares') RETURN path`,
          //statement : `MATCH path = (p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'})<-[r]->(m) WHERE p.nombre = 'Mauricio' or p.nombre = 'Felipe' RETURN path`,
          statement : stmnt,
          resultDataContents:["graph"]
        })
  
        
        // EN CASO DE NECESITAR AGREGAR UN CAMPO EXTRA AL NODO DE USUARIOS
        /*
        instrucciones.statements.push({
          resultDataContents:["graph"],
          statement: `MATCH (n:Persona {codigo: '3dd7e10d-d213-4221-b105-be46271724ac'}) SET n.area = 'Finanzas' RETURN n;`


        })
        */

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


      async getParticipantes ({request,response}){
        const cliente =request.input('cliente');
        var neo4j = Env.get('NEO4J', '192.168.3.18:7474');
        var neo4jUser = Env.get('NEO4J_USER', 'neo4j');
        var neo4jPassword = Env.get('NEO4J_PASSWORD', 'Qwerty123');
        var options_auth = new Buffer(`${neo4jUser}:${neo4jPassword}`).toString("base64")
        
        //console.log(request.all());
        
        /**
         * Get Preguntas
         */
        var idPersonas=""
        var instrucciones ={statements:[]}
        var idAplicacion = request.input("idAplicacion");
        //console.log(idAplicacion);
        /**
         * Se crea persona que está contestando
         */
        //`MATCH(p:Persona{idAplicacion:'4771dc31-2621-11e8-80db-bc764e10787e'}) return p`
        
        if(idAplicacion == "undefined")
        {
          idAplicacion = "4771dc31-2621-11e8-80db-bc764e10787e";
        }

        var stmnt = "MATCH path = (p:Persona{idAplicacion:'"+idAplicacion+"'}) RETURN path";
        //console.log(stmnt);

        instrucciones.statements.push({
          statement : stmnt,
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
          //console.log(neoResponse);
          
          var graph = {nodes:[]};
          var nodos = [];
          
          for(var item in neoResponse){
            for(var nodo in neoResponse[item].graph.nodes){
              nodos.push(neoResponse[item].graph.nodes[nodo])      
            }
          }

          //console.log(neoResponse);

          graph.nodes=Enumerable.from(nodos).distinct("$.id").select(function(nodo){
            return{
                id:nodo.id,
                tipo:nodo.labels,
                properties:nodo.properties
            }
            }).toArray();

          response.json(graph)
  
      }

      async validaEstado({request,response}){
        //console.log(request)
        const idRedesPersona = request.input("idRedesPersona");
        
        const cliente =request.input('cliente');
        
        const query = `call redes_validaEstadoRedesPersonas('${idRedesPersona}')`;
    
        const result   = await data.execQuery(cliente,query);
        var salida = {};
        salida = result[0][0];

        response.json(salida[0].estado);
      }
}
module.exports = Medicion

