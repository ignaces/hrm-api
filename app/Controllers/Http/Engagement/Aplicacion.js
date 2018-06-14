'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const numbers = use('App/Utils/Numbers')
const mailgun = use('App/Utils/Mail') 
var Enumerable = require('linq');

class Aplicacion {
    async average (registro,variables){ 
        var largo = variables.length;
        var suma = 0;
        
        for(var i in variables){
                suma +=registro[variables[i]] *1;
        }
       const avg =suma/largo;
        return avg;
    }
    async sumBinaria(registro ,variables,limite) {
        var suma = 0.0;
        for (var item in variables)
        {
            suma +=registro[variables[item]] *1;
        }
        if (suma >= limite)
        {
            return 1;
        }
        return 0;
    }

    async getValueRango(rangos, valor, defaultValue) {
        var numero = valor;
        for (var i in rangos) {
            if (rangos[i].IncludeBottom && rangos[i].IncludeTop) {
                if (numero >= rangos[i].inicio && numero <= rangos[i].fin) {
                    return rangos[i].valorInt;
                }
            }

            if (rangos[i].IncludeBottom && !rangos[i].IncludeTop)
            {
                if (numero >= rangos[i].inicio && numero < rangos[i].fin)
                {
                    return rangos[i].valorInt;
                }
            }
        }
        return defaultValue;
    }
    async resultados({request,response}){
        var idEncuestaAplicacion = request.input("idEncuestaAplicacion")
        const cliente =request.input('cliente') ;
        
        const query = `call engagement_getRespuestas('${idEncuestaAplicacion}')`;
        
        const result   = await data.execQuery(cliente,query);
        var cabeceras =Object.keys(result[0][0][0]);
        var keyClasificaciones = [];
        for(var i = 12;i<cabeceras.length;i++){
            keyClasificaciones.push(cabeceras[i]);
        }
        
        const registros = Enumerable.from(result[0][0]).distinct("$.identificador").select(function(persona){
           
           var registro = {
                identificador:persona.identificador,
                nombres:persona.nombres,
                apellidoPaterno:persona.apellidoPaterno,
                apellidoMaterno:persona.apellidoMaterno,
                fechaNacimiento:persona.fechaNacimiento,
                fechaIngreso:persona.fechaIngreso
                
            }
            
            for(var i in keyClasificaciones){
                registro[keyClasificaciones[i]]=persona[keyClasificaciones[i]];
            }

            var respuestas = Enumerable.from(result[0][0]).where(`$.identificador == "${persona.identificador}"`).select(function(respuesta){
                return{ 
                    codigo:respuesta.codigoPregunta,
                     valor:respuesta.puntaje
                 }
             }).toArray();
             
             for(var i in respuestas){
                 registro[respuestas[i].codigo] = respuestas[i].valor;
             }
         
             return registro;


        }).toArray();
        
        for(var i in registros){
            
            registros[i].AUTONOMY =  await this.average(registros[i],["auto 1","auto 2","auto 3"]);
            registros[i].WORK_PRESSURE =  await this.average(registros[i],["wp1","wp2","wp3","wp4"]);
            registros[i].COGNITIVE_DEMANDS = await this.average(registros[i],["cogn1","cogn2","cogn3","cogn4"])
            registros[i].SOCIAL_SUPPORT	=  await this.average(registros[i],["soc1","soc2","soc3"]);
            registros[i].EMOTIONAL_DEMANDS	=  await this.average(registros[i],["emo1","emo2","emo3","emo4","emo6"]);
            registros[i].FEEDBACK	=  await this.average(registros[i],["feedb1","feedb2","feedb3"]);
            registros[i].ROLE_CONFLICT	=  await this.average(registros[i],["rolcon1","rolcon3","rolcon4"]);
            registros[i].HASSLES	=  await this.average(registros[i],["hassle2","hassle3","hassle4","hassle5"]);
            registros[i].COACH	=  await this.average(registros[i],["coach1","coach2","coach3","coach5"]);
            registros[i].OPPORTUNITIES_FOR_DEVELOPMENT	=  await this.average(registros[i],["oppor1","oppor2","oppor3"]);
            registros[i].WORK_ENGAGEMENT	=  await this.average(registros[i],["WE1","WE2","WE3","WE4","WE5","WE6","WE7","WE8","WE9"]);
            registros[i].SELF_EFFICACY	=  await this.average(registros[i],["SE1","SE2","SE3"]);
            registros[i].OPTIMISM	=  await this.average(registros[i],["optim1","optim2","optim4","optim5"]);
            registros[i].VIGOR	=  await this.average(registros[i],["WE1","WE2","WE5"]);
            registros[i].ABSORTION	=  await this.average(registros[i],["WE6","WE8","WE9"]);
            registros[i].DEDICATION	=  await this.average(registros[i],["WE3","WE4","WE7"]);
            
            registros[i].VIGOR_BINARY = await this.sumBinaria(registros[i],"VIGOR",5);
            
            registros[i].ABSORTION_BINARY = await this.sumBinaria(registros[i],"VIGOR",5);
            registros[i].DEDICATION_BINARY =await this.sumBinaria(registros[i],"ABSORTION",5);
            registros[i].ENGAGEMENT_PROPORTION = await this.sumBinaria(registros[i],"DEDICATION",5);

            var endDate = new Date().getFullYear();
            var startDate = new Date(registros[i].fechaIngreso).getFullYear();

            registros[i].ANTIGUEDAD = endDate - startDate;

            
            
            registros[i].ANTIGUEDAD_RANGO = await this.getValueRango([
                { inicio:0,fin:0,valorInt:1,IncludeBottom:true,IncludeTop:true},
                { inicio:1,fin:2,valorInt:2,IncludeBottom:true,IncludeTop:false},
                { inicio:3,fin:5,valorInt:3,IncludeBottom:true,IncludeTop:false},
                { inicio:5,fin:10,valorInt:4,IncludeBottom:true,IncludeTop:false},
            ], registros[i].ANTIGUEDAD,"5");
            var startDate = new Date(registros[i].fechaNacimiento).getFullYear();
            var edad =endDate-startDate;
            registros[i].EDAD = await this.getValueRango([
                { inicio:18,fin:38,valorInt:1,IncludeBottom:true,IncludeTop:true},
                { inicio:39,fin:54,valorInt:2,IncludeBottom:true,IncludeTop:true},
                { inicio:54,fin:500,valorInt:3,IncludeBottom:false,IncludeTop:false}
            ], edad,"0");
            
            registros[i].EXHAUSTION = await this.average(registros[i],["EX1","EX2","EX3","EX4"]);
            registros[i].EXHAUSTED_BYNARY = await this.getValueRango([
                { inicio:0,fin:3,valorInt:0,IncludeBottom:true,IncludeTop:false},
                { inicio:3,fin:3.25,valorInt:1,IncludeBottom:true,IncludeTop:false},
                { inicio:3.25,fin:500,valorInt:2,IncludeBottom:true,IncludeTop:false}
            ], registros[i].EXHAUSTION,"0");
            registros[i].INTENT = await this.average(registros[i],["intent1","intent2","intent3","intent4","intent5"]);
        }
        response.json(registros);
    }
    
}

module.exports = Aplicacion
