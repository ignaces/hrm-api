'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')

class Talento {


    //metodo welcome
    async getTalentos({request,response}){
        var idOpinante = request.input("idOpinante");
        const cliente = request.input('cliente');
        
        const query = `call tale_getTalentosWelcome('${idOpinante}')`;
        const result   = await data.execQuery(cliente,query);
        
        var body = 
        {
          data1: {
           condicion: result[0][0].length
          },
          data: {talentos: result[0][0][0]}
          
        }


        response.json(body);
        
    }

    //
    async getPersonaTalentos({request,response}){

        //var idProceso = request.input("idProceso");
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_gestionTalentos('${idOpinante}','${idTalentoProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
        
        //console.log(result[0][0]);
    }

    //pagina de widget obtengo total de colaboradores y id del proceso
    async getFindTalentoProceso({request,response}){

        
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_findProcesoTalento('${idTalentoProceso}','${idOpinante}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0][0]);
        
    }

}

module.exports = Talento