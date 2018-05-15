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
          data: {talentos: result[0][0]}
          
        }
     


        response.json(body);
        
    }

    
    async getPersonaTalentos({request,response}){

        //var idProceso = request.input("idProceso");
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_gestionTalentos('${idOpinante}','${idTalentoProceso}')`;
        
        const result = await data.execQuery(cliente,query);
        
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

    async getPersona({request,response}){
    
        var idPersona = request.input('idPersona');
        var idProceso = request.input('idProceso');
        var identificador = "";
        
        const cliente = request.input('cliente');
        
        const query =  `call tale_getPersona('${idPersona}','${idProceso}')`;
        
        //const query =  `call pers_getClasificacion('${idPersona}')`;
        const usp   = await data.execQuery(cliente,query);
       
        
       if(usp[0]==undefined){
           return response.json({})
       }
       if (usp[0][0][0]==undefined){
        return response.json({})
       }
       
        /*const Clasificaciones = Enumerable.from(usp[0][0]).select(function(Clasificacion){
            return{
               nombre:Clasificacion.Clasificacion,
               valor:Clasificacion.Valor

            }
        })*/
        
        var persona = {
            identificador:usp[0][0][0].identificador,
            nombres:usp[0][0][0].nombres,
            apellidoPaterno:usp[0][0][0].apellidoPaterno,
            apellidoMaterno:usp[0][0][0].apellidoMaterno,
            email:usp[0][0][0].email,
            cargo:usp[0][0][0].cargo,
            //clasificaciones:Clasificaciones.toArray()      
        };
        
      response.json(persona);
    }
    async seleccionDragTalentoAPI({request,response}){

        
        var idTalentoMatriz = request.input("idTalentoMatriz");
        var idTalentoOpinante = request.input("idTalentoOpinante");
        const cliente = request.input('cliente');

        const query = `call tale_seleccionTalento('${idTalentoMatriz}','${idTalentoOpinante}')`;

        const result   = await data.execQuery(cliente,query);
        
       response.json(result[0]);
        
    }

    async colaboradoresSinCuadrante({request,response}){

        //var idProceso = request.input("idProceso");
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_colaboradoresSinCuadranteCla('${idOpinante}','${idTalentoProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        var clasificacionTale = [];
         //.distinct("$.idPadre")
        const personas = Enumerable.from(result[0][0]).distinct("$.idPersona").select(function(clasificacion){
            return{
                idPersona:clasificacion.idPersona,
                identificador:clasificacion.identificador,
                Colaborador:clasificacion.Colaborador,
                apellidoPaterno:clasificacion.apellidoPaterno,
                apellidoMaterno:clasificacion.apellidoMaterno,
                Cargo:clasificacion.Cargo,
                procesoOpinante:clasificacion.procesoOpinante,
                foto:clasificacion.foto,
                genero:clasificacion.genero
                
                //idHijo:clasificacion.idHijo
                //nombreHijo:clasificacion.nombreHijo

            }
        })

        clasificacionTale = {
            clasificaciones:personas.toArray()
        }
        
        for(var clasificacion in clasificacionTale.clasificaciones){
            var conjuntoPadre = clasificacionTale.clasificaciones[clasificacion].idPersona

            const clasificacionHijo = Enumerable.from(result[0][0]).where(`$.idPersona == "${conjuntoPadre}"`).select(function(ac){
                return{
                    ClasificacionesCol:ac.ClasificacionesCol

                   /* idPadre:ac.idPadre,
                    nombrePadre:ac.nombrePadre,
                    idHijo:ac.idHijo,
                    */
                }
            }).toArray()
            clasificacionTale.clasificaciones[clasificacion].clasificacionHijo = clasificacionHijo

            const atributos = Enumerable.from(result[0][0]).where(`$.idPersona == "${conjuntoPadre}"`).select(function(ac){
                return{
                    nombre:ac.atributo,
                    color:ac.colorAtributo,
                    icono:ac.iconoAtributo,
                    tooltip:ac.tooltipAtributo
                }
            }).toArray()
            clasificacionTale.clasificaciones[clasificacion].atributos = atributos
        }
        
        
        //console.log(clasificacionTale);
        response.json(clasificacionTale);
        /*
        //var idProceso = request.input("idProceso");
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_colaboradoresSinCuadrante('${idOpinante}','${idTalentoProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
        */
        //console.log(result[0][0]);
    }




    async generaCuadrantes({request,response}){

        //var idProceso = request.input("idProceso");
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_pintarCuadrantes('${idOpinante}','${idTalentoProceso}')`;
        const result   = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);
        
     
        //console.log(result[0][0]);
    }

    async colaboradoresEvaluados({request,response}){

        /*
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_colaboradoresEvaluados('${idOpinante}','${idTalentoProceso}')`;
        const result = await data.execQuery(cliente,query);
        
        
        response.json(result[0][0]);
        */

        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_colaboradoresEvaluados('${idOpinante}','${idTalentoProceso}')`;
        
        const result = await data.execQuery(cliente,query);
        var clasificacionTale = [];
        //.distinct("$.idPadre")
       const clasificaciones = Enumerable.from(result[0][0]).distinct("$.idPersona").select(function(clasificacion){
           return{
               idPersona:clasificacion.idPersona,
               identificador:clasificacion.identificador,
               nombres:clasificacion.nombres,
               apellidoPaterno:clasificacion.apellidoPaterno,
               apellidoMaterno:clasificacion.apellidoMaterno,
               idTalentoRespuestaCuadrante:clasificacion.idTalentoRespuestaCuadrante,
               Cargo:clasificacion.Cargo,
               idTalentoCuadrante:clasificacion.idTalentoCuadrante,
               color:clasificacion.color,
               idOpinante:clasificacion.idOpinante,
               foto:clasificacion.foto,
               genero:clasificacion.genero
               

           }
       })

       clasificacionTale = {
           clasificaciones:clasificaciones.toArray()
       }

       for(var clasificacion in clasificacionTale.clasificaciones){
           var conjuntoPadre = clasificacionTale.clasificaciones[clasificacion].idPersona

           const clasificacionHijo = Enumerable.from(result[0][0]).where(`$.idPersona == "${conjuntoPadre}"`).select(function(ac){
               return{
                   ClasificacionesCol:ac.ClasificacionesCol

                  /* idPadre:ac.idPadre,
                   nombrePadre:ac.nombrePadre,
                   idHijo:ac.idHijo,
                   */
               }
           }).toArray()
           
           clasificacionTale.clasificaciones[clasificacion].clasificacionHijo = clasificacionHijo


           const atributos = Enumerable.from(result[0][0]).where(`$.idPersona == "${conjuntoPadre}"`).select(function(ac){
                return{
                    nombre:ac.atributo,
                    color:ac.colorAtributo,
                    icono:ac.iconoAtributo,
                    tooltip:ac.tooltipAtributo
                }
            }).toArray()
            clasificacionTale.clasificaciones[clasificacion].atributos = atributos
       }
       
       
       response.json(clasificacionTale);
 

    }


    async obtenerEmpresaOpinante({request,response}){
        var idOpinante = request.input("idOpinante");
        
        const cliente = request.input('cliente');

        const query = `call tale_obtenerEmpresa('${idOpinante}')`;
        const result = await data.execQuery(cliente,query);
        
        response.json(result[0][0][0]);

    }

    async obtenerCargosPorEmpresa({request,response}){
        var idEmpresa = request.input("idEmpresa");
        const cliente = request.input('cliente');

        const query = `call tale_cargarCargos('${idEmpresa}')`;
        const result = await data.execQuery(cliente,query);
        
        response.json(result[0][0]);

    }

    async obtenerColaboradorEvaluados({request,response}){
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_countEvaluados('${idTalentoProceso}','${idOpinante}')`;
        const result = await data.execQuery(cliente,query);
        
        
        response.json(result[0][0]);

    }
        
    

    async obtenerClasificaciones({request,response}){
        var idEmpresa = request.input("idEmpresa");
        var idTalentoProceso = request.input("idTalentoProceso");

        const cliente = request.input('cliente');
        const query = `call tale_ClasificacionPadre('${idEmpresa}','${idTalentoProceso}')`;
        const result = await data.execQuery(cliente,query);
        
        var clasificacionTale = [];
         //.distinct("$.idPadre")
        const clasificaciones = Enumerable.from(result[0][0]).distinct("$.idPadre").select(function(clasificacion){
            return{
                idPadre:clasificacion.idPadre,
                nombrePadre:clasificacion.nombrePadre,
                //idHijo:clasificacion.idHijo
                //nombreHijo:clasificacion.nombreHijo

            }
        })

        clasificacionTale = {
            clasificaciones:clasificaciones.toArray()
        }

        for(var clasificacion in clasificacionTale.clasificaciones){
            var conjuntoPadre = clasificacionTale.clasificaciones[clasificacion].idPadre

            const clasificacionHijo = Enumerable.from(result[0][0]).where(`$.idPadre == "${conjuntoPadre}"`).select(function(ac){
                return{
                    id:ac.idHijo,
                    nombreHijo:ac.nombreHijo

                   /* idPadre:ac.idPadre,
                    nombrePadre:ac.nombrePadre,
                    idHijo:ac.idHijo,
                    */
                }
            }).toArray()
            clasificacionTale.clasificaciones[clasificacion].clasificacionHijo = clasificacionHijo
        }
        
        
        //console.log(clasificacionTale);
        response.json(clasificacionTale);
        
        /*
        var json = [];
        var primerArreglo = result[0][0][0].hijo;
        var modificado1 = primerArreglo.split(",");
        for (var i = 0; i < modificado1.length; i++) {
            json.push({"Hijo":modificado1[i]});
        }
        console.log(json);
        */
        //response.json(result[0][0]);
    }

    async filtrarColaboradoresSinClasificar({request,response}){

        
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        var nombreFiltro = request.input("nombreFiltro");
        const cliente = request.input('cliente');
        var cargosFiltro = request.input("cargosFiltro");

        var rut = request.input("rut");
        var nombres = request.input("nombres");
        var paterno = request.input("paterno");
        var materno = request.input("materno");

        const query = `call tale_colaboradoresSinCuadranteFiltro('${idOpinante}','${idTalentoProceso}','${nombreFiltro}','${cargosFiltro}','${rut}','${nombres}','${paterno}','${materno}')`;
        
        const result   = await data.execQuery(cliente,query);
        

        var body = 
        {
          data: {
           arreglo: result[0][0]
          }
          /*,
          data2:{
              condicion: result[0][0].lenght
          }
          */
          
        }

        response.json(body);
        //console.log(result[0][0]);
        
    }



    async organigrama({request,response}){

        var procesoOrganigrama = request.input("idProceso");
        const cliente = request.input('cliente');
        

        const query = `call tale_getPosiciones('${procesoOrganigrama}')`;
        const result   = await data.execQuery(cliente,query);
        
        
        response.json(result[0][0]);
        
     
    }

    async getCurriculumCategoria({request,response}){
        var idPersona = request.input("idPersona");
        const cliente = request.input('cliente');

        const query = `call tale_getCurriculumCategoria()`;
        const result   = await data.execQuery(cliente,query);
        response.json(result[0][0]);

    }


    async getCurriculumPersona({request,response}){

        var idPersona = request.input("idPersona");
        const cliente = request.input('cliente');

        const query = `call tale_getCurriculumPersona('${idPersona}')`;
        const result   = await data.execQuery(cliente,query);
        response.json(result[0][0]);
    }

    async addCurriculumPersona({request,response}){
        
        var titulo = request.input("titulo");
        var bajada = request.input("bajada");
        var desde = request.input("desde");
        var hasta = request.input("hasta");
        var descripcion = request.input("descripcion");
        var idPersonaCurriculumCategoria = request.input("idPersonaCurriculumCategoria");
        var idPersonaFicha = request.input("idPersonaFicha");

        const cliente = request.input('cliente');
        const query = `call tale_addPersonaCurriculumItem('${titulo}', '${bajada}', '${desde}', '${hasta}', '${descripcion}', '${idPersonaFicha}', '${idPersonaCurriculumCategoria}')`;
        const result   = await data.execQuery(cliente,query);
        response.json(result[0][0]);
    }
}

module.exports = Talento