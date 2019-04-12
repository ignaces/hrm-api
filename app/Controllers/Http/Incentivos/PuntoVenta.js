'use strict'

const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
const Env = use('Env')
var Enumerable = require('linq')

class PuntoVenta {

    async import({request,response}){
        var idNotificacion = request.input("idNotificacion")
        var pos = request.input("pos")
        var json = JSON.stringify(pos)
        const cliente = request.input("cliente");
        json=json.replace(/'/g, "''");

        const query = `call pos_CargaMasivaPuntoVenta('${json}')`;
        console.log(query)
        try{
            const rs = await data.execQuery(cliente,query);
        }catch(ex){

            console.log(ex)
        }
    }
}
module.exports = PuntoVenta

