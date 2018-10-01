'use strict'
const Database = use('Database')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
class Encuesta {
    
    async getProcesos({request,response}){
      
        try {
            
        } catch (e) {
            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }
    async setOpinantesEncuesta({request,response}){
        const identificadoresIn =request.input('identificadores');
        const idEncuesta = request.input("idEncuesta");
        try {
            /**
             * 1.-Traer personas desde bci
             * 2-.Crear personas en base hrm
             * 3.-Crear EncuestaPersona
             * 4.-Crear EciOpinante
             */
            const cliente =request.input('cliente');
            const identificadores = identificadoresIn.toString().replace(/,/g , "'',''");

            const query =`exec getColaboradoresByIdentificador '''${identificadores}'''`;
            
            const result   = await data.execQueryMS(query);
         
            const inserts = Enumerable.from(result).select(function(persona){
                return `call eci_addPersona ('${idEncuesta}','${persona.identificador}','${persona.nombres}','${persona.ap_pat}','${persona.ap_mat}','${persona.genero}','${persona.email}','69e8753a-621c-11e8-8fb3-bc764e100f2b'); `;
            }).toArray();
            
            var idsPersonas=[]
            for(var i in inserts){
                console.log(inserts[i]);
                var resultPersonas   = await data.execQuery(cliente,inserts[i]);
                //idsPersonas.push(resultPersonas[0][0][0].idPersona)
            }
            /*
            16 agosto / 29 septiembre 2018

            Galería QUQU exhibe una exposición individual de pintura de la artista Pola Alcalde 
            quien nos presenta un conjunto de ocho obras en pintura sobre madera y tela en gran formato,
            junto a pinturas, acuarelas y collage sobre papel en mediano y pequeño formato.
            
            El movimiento telúrico alude a la liberación de energía que sacude la corteza terrestre, 
            e interpreta muy bien la dinámica pictórica de la obra de Pola Alcalde. 
            Su pintura tiene un fuerte carácter expresionista, donde el gesto es el verdadero protagonista 
            que se esconde tras la insinuación de un paisaje que transita desde lo evidente a un eco lejano.
            
            Hay un intento por redescubrir el paisaje en su dimensión antropológica; 
            ya no se refiere a sí mismo, sino que se vuelve una imagen abierta del hombre.
            Es un paisaje transfigurado por el tiempo y la muerte humanas, pero que nos contiene 
            y nos envuelve como escenario que permanece. 
            
            El automatismo gestual hace eco de lo efímero. El soporte, ya sea trupán, tela, cartón o papel,
            es intervenido sin una organización premeditada, y pasa a ser una especie de pizarra o muro. 
            Es un proceso de apropiación y conquista en que el paisaje es pintado y borrado, en una 
            superposición de capas donde incisiones, manchas y las huellas de lo borrado lo transmutan en 
            un paisaje nuevo, un paisaje humano. La opción de la horizontalidad permite que se expanda aún
            más allá de su formato.
            
            En esta ocasión, la artista también nos presenta un conjunto de obras en  mediano y pequeño 
            formato donde el papel toma un rol primordial.
            “…lo desfragilizo; lo rayo, lo lavo, lo lijo, lo rompo y lo corto de forma cuadrada, no perfecta,
            pero  que se noten pequeñas cuadrículas que empiezan a interactuar entre sí como un enjambre. 
            También el uso de distintos tipos de papel, grueso, delgado, nuevo, antiguo transparente, etc.
            me ayudan a crear estas especies de “figuras” de la memoria, o recuadros donde algunas cosas
            permanecen, otras se esconden y otras simplemente no las volvemos a ver.”
            
            Pola Alcalde es Licenciada en Arte, Pontificia Universidad Católica de Chile, año 2.000 
            */


        } catch (e) {



            
            response.json({
                "estado": {
                    "codigo": "ERROR",
                    "mensaje": ""
                },
                "paginacion": "",
                "data": ""
            });
        } 
    }
}

module.exports = Encuesta