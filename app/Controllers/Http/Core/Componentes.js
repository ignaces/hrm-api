'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Componentes {

    async getComponente({request,response}){
      
                
        
        const cliente = request.input('cliente') ;

        //console.log(cliente);

        const componente = request.input('componente') ;
        //const query =`call modulo_getComponente('${cliente}','${componente}')`;
        const query =`call modulo_getComponente('cs','${componente}')`;
        const respuesta   = await data.execQuery('app',query);
        //console.log(query)
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
        
    }
}

module.exports = Componentes
