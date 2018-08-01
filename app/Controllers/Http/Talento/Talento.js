'use strict'

var Enumerable = require('linq')
const data = use('App/Utils/Data')
const dateformat = require('dateformat');

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

    async removeFromArray(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
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
       
        var jefe = "Vacante";
        if(usp[0][0][0].idPersonaJefe!="VACANTE"){
            jefe=`${usp[0][0][0].nombresPersonaJefe} ${usp[0][0][0].apellidoPaternoJefe} ${usp[0][0][0].apellidoMaternoJefe}`
        }
        
        var persona = {
            identificador:usp[0][0][0].identificador,
            nombres:usp[0][0][0].nombres,
            apellidoPaterno:usp[0][0][0].apellidoPaterno,
            apellidoMaterno:usp[0][0][0].apellidoMaterno,
            email:usp[0][0][0].email,
            cargo:usp[0][0][0].cargo,
            imageUser:usp[0][0][0].imageUser,
            nombreNacionalidad:usp[0][0][0].nacionalidad,
            iconoPais:usp[0][0][0].iconoPais,
            paisEmpresa:usp[0][0][0].paisEmpresa,
            iconoPaisEmpresa:usp[0][0][0].iconoPaisEmpresa,
            fechaNacimiento:dateformat(usp[0][0][0].fechaNacimiento,"dd-mm-yyyy"),
            fechaIngreso:dateformat(usp[0][0][0].fechaIngreso,"dd-mm-yyyy"),
            jefeDirecto:jefe
            //clasificaciones:Clasificaciones.toArray()      
        };
        
      response.json(persona);
    }
    
    async seleccionDragTalentoAPI({request,response}){

        
        var idCuadrante = request.input("idTalentoMatriz");
        var idTalentoOpinante = request.input("idTalentoOpinante");
        var justificacion=request.input("justificacion");
        const cliente = request.input('cliente');

        const queryValido = `call tale_validaEquivalencia('${idCuadrante}','${idTalentoOpinante}')`;
      
        const resultValido   = await data.execQuery(cliente,queryValido);
        
        var validacion = resultValido[0][0][0];
        if(validacion.valido==1 || justificacion!=""){
            const query = `call tale_seleccionTalento('${idCuadrante}','${idTalentoOpinante}','${justificacion}')`;
            
            const result   = await data.execQuery(cliente,query);

        }
        
        
        response.json(validacion);
        
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
                genero:clasificacion.genero,
                edd:clasificacion.edd,
                trAnterior:clasificacion.tr_anterior

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

       

        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        const cliente = request.input('cliente');

        const query = `call tale_colaboradoresEvaluados('${idOpinante}','${idTalentoProceso}')`;
        
        const result = await data.execQuery(cliente,query);
        var clasificacionTale = [];
        
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
               genero:clasificacion.genero,
               edd:clasificacion.edd,
               trAnterior:clasificacion.tr_anterior
               

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
        
       
    }

    async filtrarColaboradoresSinClasificar({request,response}){

        
        var idOpinante = request.input("idOpinante");
        var idTalentoProceso = request.input("idTalentoProceso");
        var clasificaciones = request.input("clasificaciones");
        const cliente = request.input('cliente');
        var cargos = request.input("cargos");
        var tr = request.input("tr");
        var jefatura = request.input("jefatura");
        var identificador = request.input("identificador");
        var nombres = request.input("nombres");
        var paterno = request.input("paterno");
        var materno = request.input("materno");
        clasificaciones = await this.removeFromArray(clasificaciones,'-1');
        const query = `call tale_colaboradoresSinCuadranteFiltro('${idOpinante}','${idTalentoProceso}','${clasificaciones}','${cargos}','${identificador}','${nombres}','${paterno}','${materno}','${jefatura}')`;
        
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
        var idPersonaOpinante = request.input("idPersonaOpinante");
        const cliente = request.input('cliente');
        
      
        const query = `call tale_getPosiciones('${procesoOrganigrama}','${idPersonaOpinante}')`;
        
        const result   = await data.execQuery(cliente,query);
        const posiciones = Enumerable.from(result[0][0]).distinct("$.idPosicion").select(function(posicion){
         
            return{
                idPosicion:posicion.idPosicion,
                nombre:posicion.nombre,
                codigo:posicion.codigo,
                critico:posicion.critico,
                nivel:posicion.nivel,
                idPadre:posicion.idPadre,
                idPersona:posicion.idPersona,
                nombresPersona:posicion.nombresPersona,
                apellidoPaterno:posicion.apellidoPaterno,
                apellidoMaterno:posicion.apellidoMaterno,
                fotoPersona:posicion.fotoPersona,
                colorPosicion:posicion.colorPosicion,
                nombreCuadrante:posicion.nombreCuadrante,
                valor:posicion.valor,
                edd:posicion.edd,
                idCuadranteEq:posicion.idCuadranteEq,
                valorEdeEq:posicion.valorEdeEq,
                idCuadrante:posicion.idCuadrante,
                atributos:Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function(atributo){
                    return {
                        atributo:atributo.atributo,
                        colorAtributo:atributo.colorAtributo,
                        iconoAtributo:atributo.iconoAtributo,
                        tooltipAtributo:atributo.tooltipAtributo,
                    }
                }).toArray(),
                nombreSucesor:posicion.sucesorNombres,
                apSucesor:posicion.sucesorApellidoPaterno,
                amSucesor:posicion.sucesorApellidoMaterno,
                fotoSucesor:posicion.fotoSucesor,
                colorSucesor:"lightteal"

            }
        }).toArray()
        
        var posicionesSalida = [];
        for(var i in posiciones){

            posicionesSalida.push({
                idPosicion:posiciones[i].idPosicion,
                nombre:posiciones[i].nombre,
                codigo:posiciones[i].codigo,
                critico:posiciones[i].critico,
                nivel:posiciones[i].nivel,
                idPersona:posiciones[i].idPersona,
                idPadre:posiciones[i].idPadre,
                nombresPersona:posiciones[i].nombresPersona,
                apellidoPaterno:posiciones[i].apellidoPaterno,
                apellidoMaterno:posiciones[i].apellidoMaterno,
                fotoPersona:posiciones[i].fotoPersona,
                colorPosicion:posiciones[i].colorPosicion,
                nombreCuadrante:posiciones[i].nombreCuadrante,
                valor:posiciones[i].valor,
                edd:posiciones[i].edd,
                idCuadranteEq:posiciones[i].idCuadranteEq,
                valorEdeEq:posiciones[i].valorEdeEq,
                idCuadrante:posiciones[i].idCuadrante,
                atributos:posiciones[i].atributos,
            });
            if(posiciones[i].nombreSucesor!=null){
                posicionesSalida.push({
                    idPosicion:`S_${posiciones[i].idPosicion}`,
                    nombre:'Sucesor',
                    codigo:posiciones[i].codigo,
                    critico:0,
                    nivel:posiciones[i].nivel,
                    idSucede:posiciones[i].idPosicion,
                    idPersona:posiciones[i].idPersona,
                    idPadre:posiciones[i].idPadre,
                    nombresPersona:posiciones[i].nombreSucesor,
                    apellidoPaterno:posiciones[i].apSucesor,
                    apellidoMaterno:posiciones[i].amSucesor,
                    fotoPersona:posiciones[i].fotoSucesor,
                    colorPosicion:posiciones[i].colorSucesor,
                    nombreCuadrante:posiciones[i].nombreCuadrante,
                    valor:posiciones[i].valor,
                    edd:posiciones[i].edd,
                    idCuadranteEq:posiciones[i].idCuadranteEq,
                    valorEdeEq:posiciones[i].valorEdeEq,
                    idCuadrante:posiciones[i].idCuadrante,
                    atributos:[]
                });
            }
        }
        
        response.json(posicionesSalida);
        
     
    }

    async getPersonasArbol({request,response}){

        var procesoOrganigrama = request.input("idProceso");
        var idPersonaOpinante = request.input("idPersonaOpinante");
        const cliente = request.input('cliente');
        
      
        const query = `call tale_getPersonasArbol('${procesoOrganigrama}','${idPersonaOpinante}')`;
        
        const result   = await data.execQuery(cliente,query);
        const personas = result[0][0];
        
        response.json(personas);
        
     
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