'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')
const Logger = use('Logger')
/**
 * Esta clase está encargada de manejar las llamadas a la base de datos
 * @name Data
 * @class
 * 
 */
class Data  {
    /**
     * Ejecuta consulta en BD
     * @version 1.0.0
     * @deprecated since version 2.0
     * @example
     * // returns 2
     * globalNS.method1(5, 10);
     * @param  {string} client Es el nombre de dominio del cliente
     * @param  {string} query Consulta a la base de datoss
     */
    async execQueryMaster(query){
        
        
        const coneccion = await this.getConeccionCliente("");

        Database.Config._config.database.default=coneccion;
        try{
            const result = await Database.connection('default').schema.raw(query);
        
            Database.close(['default'])
            Database.close()
            return result;
        }catch(ex){
            Database.close(['default'])
            Database.close()
            return ex;
        }
        
        
        
        
        
    }
    /**
     * Ejecuta consulta en BD
     * @version 1.0.0
     * @deprecated since version 2.0
     * @example
     * // returns 2
     * globalNS.method1(5, 10);
     * @param  {string} client Es el nombre de dominio del cliente
     * @param  {string} query Consulta a la base de datoss
     */
    async execQuery(client,query){
        
        
        const coneccion = await this.getConeccionCliente(client);
      
        
        Database.Config._config.database.default=coneccion;
        try{
            const result = await Database.connection('default').schema.raw(query);
        
            try{
                Database.close(['default']);
            }catch(e){}
            
            
            return result;
        }catch(ex){
            Database.close(['default'])
            
            Logger.debug(`query:${query},mensaje:${ex.message}`);
            
            return ex;
        }
        
        
        
        
        
    }
    /**
     * Ejecuta consulta en BD
     * @version 1.0.0
     * @deprecated since version 2.0
     * @example
     * // returns 2
     * globalNS.method1(5, 10);
     * @param  {string} client Es el nombre de dominio del cliente
     * @param  {string} query Consulta a la base de datoss
     */
    async execQueryMS(query){
        
        
        try{
            const result = await Database.connection('msprod').schema.raw(query);
        
            Database.close(['msprod'])
            return result;
        }catch(ex){
            Database.close(['msprod'])
            return ex;
        }
        
        
        
        
        
    }
    /**
     * 
     * @param  {string} client Es el nombre de dominio del cliente
     */
    async getConeccionCliente (client){ 
        
        if(client==""){
            const coneccion ={client:'mysql',connection:{
                host: Env.get('DB_HOST', '192.168.3.18'),
                port: Env.get('DB_PORT', '3306'),
                user: Env.get('DB_USER', 'root'),
                //password: Env.get('DB_PASSWORD', 'QazQwerty123_'),
                password: Env.get('DB_PASSWORD', 'Qwerty123'),
                database:"KH"
            }};
            return coneccion;
        }
        if(client == "localhost" || client=="hrmdev"){
            client = "hrm";
        }
        var bd = "";
        /**Vamos a la BD de la aplicación para rescatar el nombre de la bd del cliente */
        var query =`select * from Cliente where domain = '${client}'`;
        const result = await Database.connection('app').schema.raw(query);
        
        if(client=='app'){
            bd="hrmapp";
        }else{
            bd = result[0][0].bd;
        }
        
        var bdDefault = Env.get('BD_DEFAULT', '');
        if(bdDefault!=''&& client!="app"){
            bd=bdDefault;
        }
        const coneccion ={client:'mysql',connection:{
            host: Env.get('DB_HOST', '192.168.3.18'),
            port: Env.get('DB_PORT', '3306'),
            user: Env.get('DB_USER', 'root'),
            //password: Env.get('DB_PASSWORD', 'QazQwerty123_'),
            password: Env.get('DB_PASSWORD', 'Qwerty123'),
            database:bd
        }};
        return coneccion;
    }
}
module.exports = new Data
