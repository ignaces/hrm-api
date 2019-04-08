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
      //console.log(query);
      const usp   = await data.execQuery(cliente,query);
      //response.json(1);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(1);
      } 
      
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
      const cliente   = request.input('cliente');
      const idPersona = request.input('idPersona');
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

    async getPuntosDeVentaPersona({request,response})
    {
      const cliente   = request.input('cliente');
      const idPersona = request.input('idPersona');
      const query = `call inc_getPuntosDeVentaPersona('${idPersona}')`;
      console.log(query);
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
      //console.log("AAA");
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
      
      const query = `call inc_getValoresMetasDev('${idPersona}', '${idPuntoDeVenta}')`;
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

    async getKardex({request,response})
    {
      const cliente =request.input('cliente');
      //console.log(cliente);
      //return false;
      const idPersona =request.input('idPersona');
      const idPuntoDeVenta =request.input('idPuntoDeVenta');
      
      //console.log(productos);
      //return false;

      const query = `call inc_getKardex('${idPersona}', '${idPuntoDeVenta}')`;
      
      const usp   = await data.execQuery(cliente,query);
      //console.log(query);
      //, '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidosCliente}', '${emailCliente}', '${telefonoCliente}' )`);
      //response.json(1);

      var obj = {};
      obj.cabeceras = usp[0][0];
      obj.detalles = usp[0][1];
      

      response.json(obj);
    }

    async getPeriodos({request,response})
    {
      const cliente =request.input('cliente');
      //console.log(cliente);
      //return false;
      
      //const idPersona =request.input('idPersona');
      //const idPuntoDeVenta =request.input('idPuntoDeVenta');
      
      //console.log(productos);
      //return false;

      const query = `call inc_getPeriodos()`;
      
      const usp   = await data.execQuery(cliente,query);
      //console.log(query);
      //, '${urlFoto}', '${lat}', '${lon}', '${idPuntoDeVenta}', '${productos}', '${productos}', '${idCliente}', '${identificadorCliente}', '${nombreCliente}', '${apellidosCliente}', '${emailCliente}', '${telefonoCliente}' )`);
      //response.json(1);

      var obj = {};
      obj.periodos = usp[0][0];

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


    async getProductos2_CG({request,response}){

      const offset = request.input("offset") ? request.input("offset") : 0;
      const limit = request.input("limit") ? request.input("limit") : 1000;
      const query = `call GetProductos('dt_cre',${offset},${limit})`;
      const cliente = request.input('cliente');
      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(e);
      }

    }


    async getProductos_CG({request,response}){

      const idProducto = request.input("idProducto") ? request.input("idProducto") : '';
      const cliente = request.input('cliente');
      const query = `call consulta_producto('${idProducto}')`;

      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(1);
      }

    }

    async getAttrProductos_CG({request,response}){

      const idProducto = request.input("idProducto") ? request.input("idProducto") : '';

      const query = `call busca_producto('${idProducto}');`;
      const cliente = request.input('cliente');
      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        return response.json(usp[0][0]);
      }
      catch(e)
      {
        return response.json(1);
      }

    }

     async getParams_CG({request,response}){
      const cliente = request.input('cliente');
      const param = request.input("param") ? request.input("param") : '';
      const query = (param == "MAR") ? `call getMarca()` : `call consulta('''${param}''')`;

      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        return response.json(usp[0][0]);
      }
      catch(e)
      {
        return response.json(1);
      }

    }

     async addProduct_CG({request,response}){

      const nombre = request.input('product-name');
      const codigo = request.input('product-code');
      const precio = request.input('product-price');
      const marca = request.input('product-brand');
      const familia = request.input('product-fam');
      const envase = request.input('product-env');
      const rubro = request.input('product-rub');
      const variedad = request.input('product-var');
      const cliente = request.input('cliente');
      const query = `call insertproducto('${nombre}', null, '${codigo}', '${precio}', '${marca}', '${familia}', '${envase}', '${rubro}', '${variedad}')`;

      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        return response.json(usp[0][0]);
      }
      catch(e)
      {
        return response.json(1);
      }

    }


    async getMetas_CG({request,response}){

      const offset = request.input("offset") ? request.input("offset") : 0;
      const limit = request.input("limit") ? request.input("limit") : 1000;
      const query = `call GetMetas('dt_cre',${offset},${limit})`;
      const cliente = request.input('cliente');
      const usp   = await data.execQuery(cliente,query) ;
      //response.json(1);
      try
      {
        response.json(usp[0][0]);
      }
      catch(e)
      {
        response.json(e);
      }

    }


     async getMetasAttr_CG({request,response}){

      const param =  request.input("param");
      var qs = '';
      const cliente = request.input('cliente');
      switch (param) {
        case "PER":
          qs = "PvPeriodo";
          break;
        case "TAB":
          qs = "PvTipoTabla";
          break;
        case "TIP":
          qs = "PvTipoMeta";
          break;
        default:
          return response.json(1);
      }

      const query = `call getTipos('${qs}')`;
      
      const usp   = await data.execQuery(cliente,query);
      
      try
      {
        return response.json(usp[0][0]);
      }
      catch(e)
      {
        return response.json(1);
      }

    }


}
module.exports = Incentivos

