'use strict'
const Database = use('Database')

class Users {
    async find({request,response}){
        //const users = yield Database.select('*').from('users');
      const text =request.input('nombre') ;
      const query = `call getUsers('${text}')`;
      
      const usp   = await Database.schema.raw(query);
      

      //response.json(usp[0][0]);
      //const usp   = yield Database.schema.raw("SELECT * from users;");
      //response.json(usp[0]);
      response.json(usp[0][0]);
    }
}

module.exports = Users
