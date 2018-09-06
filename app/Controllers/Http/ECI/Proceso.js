'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Proceso {
    
    async getProcesos({request,response}){
       
        const cliente =request.input('cliente') ;
        
        const query = `call eci_getProcesos()`;
        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          estado: {
            codigo: "",
            mensaje: ""
          },
          data: {procesos: result[0][0]}
          
        }
        response.json(body);
        

       // return(body);
    }
}

module.exports = Proceso