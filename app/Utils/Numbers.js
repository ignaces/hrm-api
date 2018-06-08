'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')

/**
 * Esta clase está encargada de manejar las llamadas a la base de datos
 * @name Numbers
 * @class
 * 
 */
class Numbers  {
    async average (registro,variables){ 
        var largo = variables.length;
        var suma = 0;
        
        for(var i in variables){
                suma +=registro[variables[i]] *1;
        }
       const avg =suma/largo;
        return avg;
    }
}
module.exports = new Numbers
