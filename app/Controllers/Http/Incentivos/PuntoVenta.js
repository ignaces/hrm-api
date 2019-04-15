'use strict'

const Database = use('Database')
const got = use('got')
const data = use('App/Utils/Data')
const Env = use('Env')
var Enumerable = require('linq')

class PuntoVenta {

    // c
    async createBulkPuntoVenta({request,response})
    {
      var pos = request.input("pos");
      var json = JSON.stringify(pos);
      const cliente = request.input("cliente");
      json=json.replace(/'/g, "''");

      const query = `call pos_CargaMasivaPuntoVenta('${json}')`;
      try{
          const rs = await data.execQuery(cliente,query);
      }catch(ex){
          console.log(ex);
      }
    }

    // r
    async getPuntoVenta({request,response})
    {
      const cliente = request.input('cliente');
      const id = request.input("idPOS") ? request.input("idPOS") : '';
      const offset = request.input("offset") ? request.input("offset") : 0;
      const limit = request.input("limit") ? request.input("limit") : 1000;

      const query = (id == "") ? `call pos_ObtenerPuntoVenta('${id}')` : `call pos_ObtenerMultiplesPuntoVenta('dt_cre',${offset},${limit})`;

      const usp   = await data.execQuery(cliente, query);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(e);
      }
    }

    async getPersonasInPuntoVenta({request,response})
    {
      const cliente = request.input('cliente');
      const id = request.input("idPOS");
      const offset = request.input("offset") ? request.input("offset") : 0;
      const limit = request.input("limit") ? request.input("limit") : 1000;

      const query = `call pos_ObtenerPersonasPuntoVenta('${id}','dt_cre',${offset}, ${limit})`;
      const usp   = await data.execQuery(cliente, query);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(e);
      }
    }

    // u
    async updatePuntoVenta({request,response})
    {
      const cliente = request.input('cliente');
      const id = request.input("idPOS") ? request.input("idPOS") : '';

      const nombre = request.input('nombre');
      const direccion = request.input('direccion');
      const codigo = request.input('codigo');
      const activo = request.input('activo');

      var query = `call pos_ActualizaPuntoVenta('${id}', '${nombre}', '${direccion}', '${codigo}', '${activo}')`;

      const usp = await data.execQuery(cliente, query);
      try
      {
        return response.json(usp[0][0]);
      }
      catch(e)
      {
        return response.json(1);
      }
    }

    // d
    async deletePuntoVenta({request,response})
    {
      const cliente = request.input('cliente');
      const id = request.input("idPOS") ? request.input("idPOS") : '';

      const query = `call pos_BorrarPuntoVenta('${id}')`;

      const usp   = await data.execQuery(cliente, query);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(e);
      }
    }

}
module.exports = PuntoVenta

