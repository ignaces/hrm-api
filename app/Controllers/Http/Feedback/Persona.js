'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
var Enumerable = require('linq')
const dateformat = require('dateformat');
const mailgun = use('App/Utils/Mail') ;

class Persona {

    async list({request,response}){
       
        var idProceso=request.input('idProceso');
        var idPersona=request.input('idPersona');
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getByIdOpinante('${idProceso}','${idPersona}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        var lista = respuesta[0][0];

        for(var list in lista){
            var l = lista[list];

            switch(l.checkOpinado) {
                case 1:
                    lista[list].checkOpinado = 'Si';
                  break;
                case 2:
                    lista[list].checkOpinado = 'No';
                  break;
                case 3:
                    lista[list].checkOpinado = 'No';
                  break;
                default:
                    lista[list].checkOpinado = '-';
              } 
        }
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getEncuestaFeedback({request,response}){
       
        var idProceso=request.input('idProceso');
        var idPersona=request.input('idPersona');
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getInstrumento('${idPersona}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        var registros = respuesta[0][0];

        var encuesta = Enumerable.from(registros).distinct("$.IdPregruntaFacsimil").select(function (resultado) {
            return {
                IdPregruntaFacsimil:resultado.IdPregruntaFacsimil,
                enunciado:resultado.enunciado,
                alternativas: Enumerable.from(registros).where(`$.IdPregruntaFacsimil == "${resultado.IdPregruntaFacsimil}"`).select(function (alt) {
                    return {
                        idAlternativa:alt.idAlternativa,
                        textoAlternativa:alt.textoAlternativa                        
                    }
                }).toArray()
            }
        }).toArray();

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": encuesta
        });
    }

    async setEstadoEncuesta({request,response}){
        var idPersona = request.input("idPersona");
        const cliente = request.input('cliente') ;

        const qEstado = `call feedback_setEstadoEncuesta('${idPersona}')`;
        const rEstado   = await data.execQuery(cliente,qEstado);

        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);

    }

    async putRespuesta({request,response}){
        var idPersona = request.input("idPersona");
        var idPregunta = request.input("idPregunta");
        var idAlternativa = request.input("idAlternativa");
        var justificacion = request.input("justificacion");

        const cliente = request.input('cliente') ;
        if(idAlternativa==""){
            idAlternativa="null";
        }else{
            idAlternativa =`'${idAlternativa}'`;
        }
        const query = `call evaluacion_putRespuesta('${idPregunta}',${idAlternativa}, '${justificacion}',1)`;
        const result   = await data.execQuery(cliente,query);

        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);
    }

    async getFeedback({request,response}){
       
        var idOpinante=request.input('idOpinante');
        
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getById('${idOpinante}')`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }
    async saveFeedback({request,response}){
       
        var idOpinante=request.input('idOpinante');
        var observacion=request.input('observacion');
        var ipresencial=request.input('presencial');
        var idOpinado=request.input('idOpinado');
        var presencial=0;
        
        if(ipresencial=="true"){
            presencial=1;
        }

        const cliente =request.input('cliente') ;

        const query =  `call feedback_saveFeedback('${idOpinante}','${observacion}',${presencial})`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const queryEmail =  `call feedback_enviarEmailFeedback()`;
        const respEmail   = await data.execQuery(cliente,queryEmail);
        
        /* Validar envio de Email */
        if(presencial==1 && respEmail[0][0][0].activo == '1'){
            var persona = respuesta[0][0][0];
            
            var cuerpo = `<h2>Estimado(a) ${persona.nombres} ${persona.apellidoPaterno} ${persona.apellidoMaterno}</h2><p>Tu jefe ha confirmado feedback presencial, para continuar con el proceso por favor haz click <a href="http://${cliente}.enovum.cl/confirmarFeedback?iop=${idOpinante}">aquí</a>.</p>`;
            const email = await mailgun.sendEmail(persona.email,"Confirmación de Feedback",cuerpo,"gibraltar_feedback");
        } 
        if(respEmail[0][0][0].activo == '0') {
            const qEncuesta =  `call feedback_addPersonaEncuesta('${idOpinado}')`;
            const resp   = await data.execQuery(cliente,qEncuesta);       
        }
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async saveRespColaborador({request,response}){
        var idOpinado=request.input('idOpinado');
        var estado =request.input('estado');

        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveRespColaborador('${idOpinado}',${estado})`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const body = 
        {
          estado: {
            codigo: "OK",
            mensaje: ""
          }
          
        }
        response.json(body);

    }

    async saveConfirmacion({request,response}){
       
        var idOpinante=request.input('idOpinante');
        var iacuerdo=request.input('acuerdo');
        var ipresencial=request.input('presencial');
        var presencial=0;
        var acuerdo=0;
        
        if(ipresencial=="true"){
            presencial=1;
        }
        if(iacuerdo=="true"){
            acuerdo=1;
        }
        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveConfirmacion('${idOpinante}',${acuerdo},${presencial})`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": ""
        });
    }
    async getCompetenciasOpinante({request,response}){
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var idEtapaTareaActor= request.input("idEtapaTareaActor");
        
        const cliente =request.input('cliente') ;
        const query =  `call pda_getCompetenciasOpinante('${idFeedbackOpinante}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const rCompetencias= respuesta[0][0];

        var qcomp =  `call feedback_calculoEvaluacionxCompetencia('${idEtapaTareaActor}')`;
        var r = await data.execQuery(cliente,qcomp);

        var res = r[0][0];

        for(var comp in rCompetencias){
            var c = rCompetencias[comp];

            for (var r in res){
                var v = res[r];

                if(c.id.split('_')[0] == v.idCompetencia.split('_')[0]){
                    rCompetencias[comp].nombre = '(' + v.nivelSup + ') ' + rCompetencias[comp].nombre;
                }
            }
        }

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rCompetencias
        });     
    }

    async consultarAcciones({request,response}){
       
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_consultarAcciones('${idPersona}','${idProceso}')`;

        const respuesta   = await data.execQuery(cliente,query);

        /*const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idComptetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();*/
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async getAcciones({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getAccionFeedback('${idFeedbackOpinante}')`;

        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idComptetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async getEstadoPlan ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_getEstadoPlan('${idFeedbackOpinante}')`;
        
        const respuesta   = await data.execQuery(cliente,query);
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": respuesta[0][0]
        });
    }

    async addAccion({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        
        var objAccion = request.input("objAccion");
        var idCompetencia = objAccion.idCompetencia;
        var txtAccion = objAccion.accion;
        var txtObjetivo = objAccion.objetivo;
        var fechaTermino = objAccion.fechaTermino;
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_saveAccionFeedback('${idFeedbackOpinante}','${idCompetencia}','${txtAccion}','${txtObjetivo}','${fechaTermino}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idCompetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async updateAccion ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");
        var idCompetencia = request.input("idCompetencia");
        var idAccion = objAccion.id;
        var txtAccion = objAccion.accion;
        var txtObjetivo = objAccion.objetivo;
        var fechaTermino = objAccion.fechaTermino;
        
        const cliente =request.input('cliente') ;
        const query =  `call feedback_updateAccionFeedback('${idFeedbackOpinante}','${idCompetencia}','${idAccion}','${txtAccion}','${txtObjetivo}','${fechaTermino}')`;
        
        const respuesta   = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                idCompetencia:acc.idCompetencia,
                competencia:acc.competencia,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();
        
        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async deleteAccion ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");
        var objAccion = request.input("objAccion");

        var idAccion = objAccion.id;

        const cliente =request.input('cliente') ;
        const query =  `call feedback_deleteAccionFeedback('${idFeedbackOpinante}','${idAccion}')`;
        
        const respuesta = await data.execQuery(cliente,query);

        const rAcciones = Enumerable.from(respuesta[0][0]).distinct("$.id").select(function (acc) {
            return {
                id:acc.id,
                accion:acc.accion,
                objetivo:acc.objetivo,
                plazo:dateformat(acc.plazo, 'dd-mm-yyyy')
            }
        }).toArray();

        response.json({
            "estado": {
                "codigo": "OK",
                "mensaje": ""
            },
            "paginacion": "",
            "data": rAcciones
        });
    }

    async finalizarPlan ({request,response}){
       
        var idFeedbackOpinante = request.input("idFeedbackOpinante");

        const cliente =request.input('cliente') ;
        const query =  `call feedback_finalizarPlanFeedback('${idFeedbackOpinante}')`;
        
        const respuesta = await data.execQuery(cliente,query);

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

module.exports=Persona