'use strict'
const data = use('App/Utils/Data');
const response_builder = use('App/Utils/ResponseBuilderUtil');
const persona_controller = make('App/Controllers/Http/Entity/PersonaController');
const ede_etapp_controller = make('App/Controllers/Http/Entity/EdeEtapaTareaAccionProcesoPersonaController');

//20181116 / fretamal / vectoritcgroup
class EdeEtapaTareaAccionProcesoPersonaController {

    //20181116 / fretamal / vectoritcgroup
    async getBy$PersonaIdentificador$EdeEtapaTareaAccionId({request, response}) {
        console.log('api / Entity / EdeEtapaTareaAccionProcesoPersonaController / validate / access');
        var result = null;
        try {
            const result_temp = await persona_controller.getByIdentificador({request, response});
            if (result_temp.status.code != '0000') {
                return result_temp;
            }
            request._qs.persona_id,
            request._all.persona_id = result_temp.data[0].id;
        } catch (e) {
            return response_builder.technical_exception('Error al consultar Persona para Identificador.', e);
        }





        
        try {
            const result_temp = await ede_etapp_controller.getByIdentificador({request, response});
            return result_temp;
        } catch (e) {
            return response_builder.technical_exception('Error al consultar Accion para Id de Persona.', e);
        }
    }
}

module.exports = EdeEtapaTareaAccionProcesoPersonaController;
