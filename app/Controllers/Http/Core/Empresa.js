'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Empresa {

    async create({request,response}){
      
        var empresa = request.input("empresa");
        
        const cliente =request.input('cliente') ;
        const query =`call core_createEmpresa('${empresa.nombre}','${empresa.codigo}','${empresa.logo}')`;
        const respuesta   = await data.execQuery(cliente,query);
        
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
    
    
    async getMensaje({request,response}){
      
        
        
        const cliente =request.input('cliente') ;
        const query =`call core_getMensaje()`;
        const respuesta   = await data.execQuery(cliente,query);
        
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
    
}

module.exports = Empresa
