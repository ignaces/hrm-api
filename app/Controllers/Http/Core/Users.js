'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Users {
    async find({request,response}){
    
      const text =request.input('nombre') ;
      const hostname =request.input('hostname') ;
      
      const query = `call getUsers('${text}')`;
      
      const usp   = await data.execQuery(hostname,query);
      
      response.json(usp[0][0]);
    }
    
}

module.exports = Users
