'use strict'
const Database = use('Database')

class Persona {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      
      const query = `call getPersonas('${text}')`;
      
      const usp   = await Database.connection('dev').schema.raw(query);
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      
      response.json(usp[0][0]);
    }

    async getPersona({request,response}){
      
        const idCliente = request.input('idCliente');
        const idPersona = request.input('idPersona');
        
        const query = `call pers_getPersona('${idPersona}')`;
        
        const result = await Database.connection('dev').schema.raw(query);

        const body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          paginacion: {
            totalRegistros: "",
            totalPaginas: "",
            pagina: "",
            registros: ""
          },
          data: {persona: result[0][0]}
          
        }
        
        response.json(body);
      }
    
}

module.exports = Persona