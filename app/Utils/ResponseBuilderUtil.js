'use strict'

//20181128 / fretamal / vectoritcgroup
class ResponseBuilderUtil {

  /*
  code 0000 = successful process
  code 0001 = successful process without results
  code 0002 = technical exception
  code 0003 = business exception
  */

  response_structure () {
    return {
        status: {
          code : null,
          message : null,
          detail : null
        },
        data: null
      };
  }

  success (result, message_if_empty) {
    var response = this.response_structure();
    try {
      if ( (result == null) || (typeof result === 'undefined') || (Object.keys(result[0]).length === 0) ) {
        response.status.code = '0001';
        response.status.message = message_if_empty;
      } else {
        response.status.code = '0000';
        response.data = result[0];
      }
    } catch (e) {
      return technical_exception (e, 'Error al construir respuesta.');
    }
    return response;
  }
  
  technical_exception (message_for_user, exception) {
    var response = this.response_structure();
    try {
      response.status.code = '0002';
      response.status.message = message_for_user;
      response.status.detail = exception;
    } catch (e) {
      //technical_exception (e, 'happy death day!!');
      response.status.code = '0002';
      response.status.message = 'Error al construir respuesta.';
      response.status.detail = e;
    }
    return response;
  }

  business_exception (message_for_user, message_for_support) {
    var response = this.response_structure();
    try {
      response.status.code = '0003';
      response.status.message = message_for_user;
      response.status.detail = message_for_support;
    } catch (e) {
      return technical_exception (e, 'Error al construir respuesta.');
    }
    return response;
  }

}

module.exports = new ResponseBuilderUtil;