'use strict'
const Database = use('Database')

class Persona {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      
      const query = `call getPersonas('${text}')`;
      
      const usp   = await Database.connection('local').schema.raw(query);
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      
      response.json(usp[0][0]);
    }
    
}

module.exports = Persona
