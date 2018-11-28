'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Administracion {

    async getClientes({request,response}){
      
                
        const query =`call cliente_getClientes('')`;
        const respuesta   = await data.execQuery('app',query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
        //response.json(respuesta[0][0]);
    }
    
    async cargaEvaluadorMasiva({request,response}){

        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");
        var json = request.input("json");
        const cliente =request.input('cliente') ;

        const query = `call pers_updEvaluadorMasivo('${json}','${idProceso}','${idEtapa}')`;
        //const rEstado   = await data.execQuery(cliente,query);

        console.log(query);

    }

    
}

module.exports = Administracion
