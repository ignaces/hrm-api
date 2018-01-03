'use strict'
const Database = use('Database')

class Users {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      console.log(text)
      const query = `call getUsers('${text}')`;
      
      const usp   = await Database.connection('dev').schema.raw(query);
      
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      
      response.json(usp[0][0]);
    }
    
}

module.exports = Users
