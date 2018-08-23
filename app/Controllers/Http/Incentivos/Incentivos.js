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
class Incentivos {

    async getProducto({request,response}){
        const idProducto = request.input("idProducto");
        //const query = `call redes_getPersonas('${idRedesPersona}')`;
        
        const cliente =request.input('cliente');
        
        //const usp   = await data.execQuery(cliente,query);
        
        //const usp   = yield Database.schema.raw("SELECT * from users;");
        //response.json(usp[0]);

        var salida = [];

        for(var i=0; i<arrProd.length; i++)
        {
            if(arrProd[i]["ean"] == idProducto)
            {
                salida.push(arrProd[i]);
            }
            //console.log(arrProd[i]);
        }
        
        response.json(salida);
    }

    async addCheckIn({request,response}){
      //const idProducto = request.input("idProducto");
      //const query = `call redes_getPersonas('${idRedesPersona}')`;
      
      const cliente =request.input('cliente');
      const idPersona = request.input('idPersona');
      const idPuntoDeVenta = request.input('idPuntoDeVenta');
      const lat = request.input('lat');
      const lon = request.input('lon');

      const query = `call inc_addCheckIn('${idPersona}', '${idPuntoDeVenta}', '${lat}', '${lon}')`;
      const usp   = await data.execQuery(cliente,query);
      
      response.json(1);
    }

    async getCheckIn({request,response}){
      //const idProducto = request.input("idProducto");
      //const query = `call redes_getPersonas('${idRedesPersona}')`;
      
      const cliente =request.input('cliente');
      const idPersona = request.input('idPersona');
      const idPuntoDeVenta = request.input('idPuntoDeVenta');
      
      const query = `call inc_getCheckIn('${idPersona}', '${idPuntoDeVenta}')`;
      const usp   = await data.execQuery(cliente,query);
      
      response.json(usp[0][0]);
    }

    async getProductoPOS({request,response})
    {
      const cliente =request.input('cliente');
      
      const idPuntoDeVenta = request.input('idPuntoDeVenta');
      const ean = request.input('ean');
      const nombre = request.input('nombre');
      const marca = request.input('marca');

      const query = `call inc_getProductoPuntoDeVenta('${idPuntoDeVenta}', '${ean}', '${nombre}', '${marca}')`;
      console.log(query);
      const usp   = await data.execQuery(cliente,query);
      //console.log(`call inc_getProductoPuntoDeVenta('${idPuntoDeVenta}', '${ean}')`);
      response.json(usp[0][0]);
    }


    async addCliente({request,response})
    {
      const cliente =request.input('cliente');
      
      const idPuntoDeVenta = request.input('idPuntoDeVenta');
      const idPersona = request.input('idPersona');

      const identificador = request.input('identificador');
      const nombres = request.input('nombres');
      const apellido = request.input('apellido');
      const email = request.input('email');
      const telefono = request.input('telefono');
      

      const query = `call inc_addCliente('${idPersona}', '${identificador}', '${nombres}', '${apellido}', '${email}', '${telefono}' )`;
      //console.log(`call inc_addCliente('${identificador}', '${nombres}', '${apellido}', '${email}', '${telefono}' )`);
      const usp   = await data.execQuery(cliente,query);
      
      response.json(1);
      //response.json(usp[0][0]);
    }

    async getCliente({request,response})
    {
      const cliente =request.input('cliente');
      
      const identificador = request.input('identificador');
      
      const query = `call inc_getCliente('${identificador}')`;
      console.log(query);
      const usp   = await data.execQuery(cliente,query);
      
      //response.json(1);
      response.json(usp[0][0]);
    }

    async getPuntosDeVenta({request,response})
    {
      const cliente =request.input('cliente');
      
      const query = `call inc_getPuntosDeVenta()`;
      //console.log(query);
      try{
        const usp   = await data.execQuery(cliente,query);
          
        //response.json(1);
        response.json(usp[0][0]);
      }catch(error)
      {
        console.log(error);
      }
      
    }

    async getCatalogoProductosPuntoDeVenta({request,response})
    {
      const cliente =request.input('cliente');
      const idPuntoDeVenta =request.input('idPuntoDeVenta');
      
      const query = `call inc_getCatalogoProductosPuntoDeVenta('${idPuntoDeVenta}')`;
      const usp   = await data.execQuery(cliente,query);
      //console.log(query);
      //response.json(1);
      response.json(usp[0][0]);
    }

    async getValoresMeta({request,response})
    {
      const cliente =request.input('cliente');
      
      var idPuntoDeVenta = '';
      var idPersona ='';
      
      if(request.input('idPuntoDeVenta'))
      {
        idPuntoDeVenta = request.input('idPuntoDeVenta');
      }

      if(request.input('idPersona'))
      {
        idPersona = request.input('idPersona');
      }

      
      const query = `call inc_getValoresMetas('${idPersona}', '${idPuntoDeVenta}')`;
      const usp   = await data.execQuery(cliente,query);
      console.log(query);
      //response.json(1);
      response.json(usp[0][0]);
    }

    async getValoresMetaBonoMix({request,response})
    {
      const cliente =request.input('cliente');
      
      var idPuntoDeVenta = '';
      var idPersona ='';
      
      if(request.input('idPuntoDeVenta'))
      {
        idPuntoDeVenta = request.input('idPuntoDeVenta');
      }

      if(request.input('idPersona'))
      {
        idPersona = request.input('idPersona');
      }
      const query = `call inc_getValoresMetaBonoMix('${idPersona}', '${idPuntoDeVenta}')`;
      const usp   = await data.execQuery(cliente,query);
      //console.log(query);
      //response.json(1);
      response.json(usp[0][0]);
    }
    

    async addVenta({request,response})
    {
      const cliente =request.input('cliente');
      //console.log(cliente);
      //return false;
      const idPersona =request.input('idPersona');
      const urlFoto =request.input('urlFoto');
      const lat =request.input('lat');
      const lon =request.input('lon');
      const productos = request.input('productos');
      const idCliente =request.input('idCliente');
      const identificadorCliente =request.input('identificadorCliente');
      const nombreCliente =request.input('nombreCliente');
      const apellidoCliente =request.input('apellidoCliente');
      const emailCliente =request.input('emailCliente');
      const telefonoCliente =request.input('telefonoCliente');
      
      const idPuntoDeVenta =request.input('idPuntoDeVenta');
      
      //console.log(productos);
      //return false;

      const query = `call inc_addVenta('${idPersona}', '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidoCliente}', '${emailCliente}', '${telefonoCliente}' )`;
      
      const usp   = await data.execQuery(cliente,query);
      console.log(query);
      //, '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidosCliente}', '${emailCliente}', '${telefonoCliente}' )`);
      response.json(1);
      //response.json(usp[0][0]);
    }


    async getDetalleVentas({request,response})
    {
      const cliente =request.input('cliente');
      //console.log(cliente);
      //return false;
      const idPersona =request.input('idPersona');
      const idPuntoDeVenta =request.input('idPuntoDeVenta');
      
      //console.log(productos);
      //return false;

      const query = `call inc_getDetalleVentas('${idPersona}', '${idPuntoDeVenta}')`;
      
      const usp   = await data.execQuery(cliente,query);
      console.log(query);
      //, '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidosCliente}', '${emailCliente}', '${telefonoCliente}' )`);
      //response.json(1);

      var obj = {};
      obj.cabeceras = usp[0][0];
      obj.detalles = usp[0][1];
      

      response.json(obj);
    }

    async deleteVenta({request,response})
    {
      const cliente =request.input('cliente');
      //console.log(cliente);
      //return false;
      const idVenta =request.input('idVenta');
      
      //console.log(productos);
      //return false;

      const query = `call inc_deleteVenta('${idVenta}')`;
      
      const usp   = await data.execQuery(cliente,query);
      //, '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidosCliente}', '${emailCliente}', '${telefonoCliente}' )`);
      //response.json(1);

      response.json(1);
    }

    
    
}
module.exports = Incentivos

