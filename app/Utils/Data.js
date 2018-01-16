'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {
    execQuery: async (client,query)=>{
        const result = await Database.connection('dev').schema.raw(query);
        return result;
    }
}