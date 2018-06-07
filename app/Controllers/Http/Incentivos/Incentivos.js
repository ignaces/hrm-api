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
        
        var arrProd = [];
        
        var objProd = {};
        objProd.idproducto = "1";
        objProd.ean = "5045410636086";
        objProd.marca = "BURBERRY";
        objProd.submarca = "";
        objProd.descripcion = "BRIT FOR HIM EDT 100ML TEST- DES";
        objProd.envase = "100 ml";
        
        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "2";
        objProd.ean = "0737052551548";
        objProd.marca = "DOLCE & GABBANA";
        objProd.submarca = "DG LB PH STROMBOLI";
        objProd.descripcion = "DG L.Blue PH Stromboli edt 125ml";
        objProd.envase = "125 ml";

        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "3";
        objProd.ean = "0737052718897";
        objProd.marca = "DOLCE & GABBANA";
        objProd.submarca = "DG LB PORTOFINO";
        objProd.descripcion = "DG LB MED PEARLS COUNTER CARD F";
        objProd.envase = "OTROS";
        
        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "4";
        objProd.ean = "0737052565279";
        objProd.marca = "ESCADA";
        objProd.submarca = "ESCADA ESP. DEL NOTES";
        objProd.descripcion = "Escad.Esp del Notes edt sflx 2ml";
        objProd.envase = "2 ml";

        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "5";
        objProd.ean = "0737052884646";
        objProd.marca = "GUCCI";
        objProd.submarca = "GUCCI GUILTY PH DIAMOND";
        objProd.descripcion = "GUCCI GUILTY PH DIAMOND 90ML EDT";
        objProd.envase = "90 ml";

        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "6";
        objProd.ean = "0737052189765";
        objProd.marca = "HUGO BOSS";
        objProd.submarca = "BOSS BOTTLED";
        objProd.descripcion = "Boss Bottled edt vap 200 ml";
        objProd.envase = "200 ml";

        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "7";
        objProd.ean = "0737052739854";
        objProd.marca = "JAMES BOND 007";
        objProd.submarca = "JB 007 QUANTUM M";
        objProd.descripcion = "JB 007 QUANTUM DEO AER 50ML PWP";
        objProd.envase = "50 ml";

        arrProd.push(objProd);

        var objProd = {};
        objProd.idproducto = "8";
        objProd.ean = "0737052189765";
        objProd.marca = "LACOSTE";
        objProd.submarca = "EAU DE LACO.L.12.12 BLANC";
        objProd.descripcion = "L1212 BLANC EDT100DS75SG50GAL CY";
        objProd.envase = "100 ml";


        arrProd.push(objProd);
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

    
}
module.exports = Incentivos

