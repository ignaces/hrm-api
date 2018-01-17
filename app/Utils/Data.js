'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')


module.exports = {
    execQuery: async (client,query)=>{
        

        const coneccion = await module.exports.getConeccionCliente(client);
        
        
        Database.Config._config.database.default=coneccion;
 

        const result = await Database.connection('default').schema.raw(query);
        
        Database.close(['default'])
        return result;
    },
    getConeccionCliente : async (client) =>{ 
        
        /**Vamos a la BD de la aplicación para rescatar el nombre de la bd del cliente */
        var query =`select * from cliente where domain = '${client}'`;
        const result = await Database.connection('app').schema.raw(query);
          
        var bd = result[0][0].bd;


        const coneccion ={client:'mysql',connection:{
            host: Env.get('DB_HOST', '192.168.3.13'),
            port: Env.get('DB_PORT', '3306'),
            user: Env.get('DB_USER', 'root'),
            password: Env.get('DB_PASSWORD', 'QazQwerty123_'),
            database:bd
        }};
        return coneccion;
    }

}
