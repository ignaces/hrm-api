'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');
const persona_controller = make('App/Controllers/Http/Entity/PersonaController');
const ede_pp_controller = make('App/Controllers/Http/Entity/EdeProcesoPersonaController');
const ede_etapp_controller = make('App/Controllers/Http/Entity/EdeEtapaTareaAccionProcesoPersonaController');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaTareaAccionProcesoPersonaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$PersonaIdentificador$EdeProcesoId$EdeEtapaTareaAccionId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaAccionProcesoPersonaController / validate / access');
        var result = null;
        var result_persona = null;
        try {
            const result_temp = await persona_controller.getBy$ThisIdentificador({request, response});
            if (result_temp.status.code != '0000') {
                return result_temp;
            }
            request._qs.persona_id,
            request._all.persona_id = result_temp.data[0].id;
            result_persona = result_temp;
        } catch (e) {
            console.log(e);
            return response_builder.technical_exception('Error al consultar Persona por Identificador.', e);
        }

        try {
            const result_temp = await ede_pp_controller.getBy$PersonaId$EdeProcesoId({request, response});
            if (result_temp.status.code != '0000') {
                return result_temp;
            }
            request._qs.ede_proceso_persona_id,
            request._all.ede_proceso_persona_id = result_temp.data[0].id;
        } catch (e) {
            return response_builder.technical_exception('Error al consultar relacion entre Persona y Proceso.', e);
        }

        try {
            const result_temp = await this.getBy$EdeProcesoPersonaId$EdeEtapaTareaAccionId({request, response});
            if (result_temp.status.code == '0000') {
                result_temp.data[0].persona = result_persona.data[0];
            }
            return result_temp;
        } catch (e) {
            return response_builder.technical_exception('Error al consultar relacion entre Persona y Accion.', e);
        }

    }

    //20181116 / fretamal / vectoritcgroup
    async getBy$EdeProcesoPersonaId$EdeEtapaTareaAccionId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaAccionProcesoPersonaController / getBy$EdeProcesoPersonaId$EdeEtapaTareaAccionId / access');
        var result = null;
        try {
            const cliente = request.input('cliente') ;
            const ede_etapa_tarea_accion_id = request.input('ede_etapa_tarea_accion_id') ;
            const ede_proceso_persona_id = request.input('ede_proceso_persona_id') ;
            //console.log('api / Entity / EdeEtapaTareaAccionProcesoPersonaController / getBy$EdeProcesoPersonaId$EdeEtapaTareaAccionId / params / ede_etapa_tarea_accion_id =' + ede_etapa_tarea_accion_id);
            //console.log('api / Entity / EdeEtapaTareaAccionProcesoPersonaController / getBy$EdeProcesoPersonaId$EdeEtapaTareaAccionId / params / ede_proceso_persona_id =' + ede_proceso_persona_id);
            var query = [];
            query.push("SELECT * ");
            query.push("FROM EdeEtapaTareaAccionProcesoPersona ");
            query.push("WHERE activo = 1 ");
            query.push("AND idEdeProcesoPersona = '" + ede_proceso_persona_id + "' ");
            query.push("AND idEdeEtapaTareaAccion = '" + ede_etapa_tarea_accion_id + "' ");

            const result_temp = await data.execQuery(cliente, query.join(""));
            result = response_builder.success(result_temp, 'No existe relacion entre Persona y Accion.');
        } catch (e) {
            result = response_builder.technical_exception('Error al consultar relacion entre Persona y Accion.', e);
        }
        return result;
    }
}

module.exports = EdeEtapaTareaAccionProcesoPersonaController;