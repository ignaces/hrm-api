'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
class Reportes {
    async list({request,response}){
      const idEmpresa =request.input('idEmpresa') ;
      const cliente =request.input('cliente') ;
      
      const query = `call reporte_getReportes('${idEmpresa}')`;
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0]);
    }

    async get({request,response}){
      const idReporte =request.input('idReporte') ;
      const cliente =request.input('cliente') ;
      
      const query = `call reporte_getReporte('${idReporte}')`;
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0][0]);
    }
}

module.exports = Reportes
