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
class Producto {
    async import({request,response}){
        var idNotificacion = request.input("idNotificacion")
        var productos = request.input("productos")
        var json = JSON.stringify(productos)
        const cliente = request.input("cliente");
        json=json.replace(/'/g, "''");
        
        const query = `call inc_importProductos('${json}')`;
        console.log(query)
        try{
            const rs   = await data.execQuery(cliente,query);
        //    console.log(rs[0][0])
        }catch(ex){

            console.log(ex)
        }
        

        
    }
}
module.exports = Producto

