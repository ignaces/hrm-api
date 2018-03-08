'use strict'
const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
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

}
module.exports = Medicion

