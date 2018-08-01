'use strict'
const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
const data = use('App/Utils/Data')
const permisos = use('App/Controllers/Http/Core/Permisos')
const dateformat = require('dateformat');
class Persona {

  async getPersona({request,response}) {

    var idPersona = request.input('idPersona');
    var idProceso = request.input('idProceso');
    var identificador = "";

    const cliente = request.input('cliente');

    const query = `call tale_getPersonaDetalle('${idProceso}','${idPersona}')`;


    const result = await data.execQuery(cliente, query);


    if (result[0] == undefined) {
      return response.json({})
    }
    if (result[0][0][0] == undefined) {
      return response.json({})
    }


    var jefe = "Vacante";
    if (result[0][0][0].idPersonaJefe != "VACANTE") {
      jefe = `${result[0][0][0].nombresPersonaJefe} ${result[0][0][0].apellidoPaternoJefe} ${result[0][0][0].apellidoMaternoJefe}`
    }

    const persona = Enumerable.from(result[0][0]).distinct("$.idPersona").select(function (posicion) {
      return {
        idPosicion: posicion.idPosicion,
        posicion: posicion.nombre,
        cargo: posicion.cargo,
        codigo: posicion.codigo,
        critico: posicion.critico,
        nivel: posicion.nivel,
        idPadre: posicion.idPadre,
        idPersona: posicion.idPersona,
        nombres: posicion.nombresPersona,
        apellidoPaterno: posicion.apellidoPaterno,
        apellidoMaterno: posicion.apellidoMaterno,
        fotoPersona: posicion.fotoPersona,
        colorPosicion: posicion.colorPosicion,
        nombreCuadrante: posicion.nombreCuadrante,
        valor: posicion.valor,
        edd: posicion.edd,
        idCuadranteEq: posicion.idCuadranteEq,
        valorEdeEq: posicion.valorEdeEq,
        idCuadrante: posicion.idCuadrante,
        codigoIdioma: posicion.codigoIdioma,
        idioma: posicion.idioma,
        banderaIdioma: posicion.banderaIdioma,
        nivelIdioma: posicion.nivelIdioma,
        paisEmpresa: posicion.pais,
        nombreNacionalidad: posicion.nombreNacionalidad,
        iconoPaisEmpresa: posicion.iconoPais,
        jefeDirecto: jefe,
        fechaIngreso: dateformat(posicion.fechaIngreso, 'dd-mm-yyyy'),
        fechaNacimiento: dateformat(posicion.fechaNacimiento, 'dd-mm-yyyy'),
        atributos: Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function (atributo) {
          return {
            atributo: atributo.atributo,
            colorAtributo: atributo.colorAtributo,
            iconoAtributo: atributo.iconoAtributo,
            tooltipAtributo: atributo.tooltipAtributo,
          }
        }).toArray(),
        idiomas: Enumerable.from(result[0][0]).where(`$.idPersona == "${posicion.idPersona}" && $.idioma != null`).distinct("$.codigoIdioma").select(function (idioma) {
          return {
            nombre: idioma.idioma,
            icono: idioma.banderaIdioma,
            nivel: idioma.nivelIdioma
          }
        }).toArray(),
        movilidades: Enumerable.from(result[0][0]).where(`$.idPersona == "${posicion.idPersona}" && $.idMovilidad != null`).distinct("$.idMovilidad").select(function (movilidad) {
          return {
            id: movilidad.idMovilidad,
            observacion: movilidad.movilidadObservacion,
            icono: movilidad.paisIconoMovilidad,
            pais: movilidad.paisMovilidad,
            paisCodigo: movilidad.movilidadCodigoPais
          }
        }).toArray()

      }
    }).toArray()

    response.json(persona);
  }
  async getClasificaciones({request,response}) {

    var idPersona = request.input('idPersona');
    var idProceso = request.input('idProceso');
    var identificador = "";

    const cliente = request.input('cliente');

    const query = `call tale_getPersonaClasificaciones('${idProceso}','${idPersona}')`;
    const result = await data.execQuery(cliente, query);
    response.json(result[0][0]);
  }

  async getResultados({request,response}) {

    var idPersona = request.input('idPersona');

    const cliente = request.input('cliente');

    const query = `call tale_getPersonaResultados('${idPersona}')`;


    const result = await data.execQuery(cliente, query);

    const clima = Enumerable.from(result[0][0]).where(`$.codigo == "CLIMA"`).select(function (resultado) {
      return {
        year: resultado.year,
        value: resultado.valor
      }
    }).toArray()

    const edd = Enumerable.from(result[0][0]).where(`$.codigo == "EDE"`).select(function (resultado) {
      return {
        year: resultado.year,
        value: resultado.valor
      }
    }).toArray()

    const tr = Enumerable.from(result[0][0]).where(`$.codigo == "TR"`).select(function (resultado) {
      return {
        year: resultado.year,
        value: resultado.valor
      }
    }).toArray()
    const resultados = {
      clima: clima,
      edd: edd,
      tr: tr
    }

    response.json(resultados);
  }

  async getPosiblesSucesores({request,response}) {

    var idPosicion = request.input('idPosicion');
    var idProceso = request.input('idProceso');
    var identificador = "";

    const cliente = request.input('cliente');

    const query = `call tale_getPosiblesSucesores('${idProceso}','${idPosicion}')`;


    const result = await data.execQuery(cliente, query);

    const posiciones = Enumerable.from(result[0][0]).distinct("$.idPosicion").select(function (posicion) {
      return {
        idPosicion: posicion.idPosicion,
        nombre: posicion.nombre,
        codigo: posicion.codigo,
        critico: posicion.critico,
        nivel: posicion.nivel,
        idPadre: posicion.idPadre,
        idPersona: posicion.idPersona,
        idProcesoPersona: posicion.idProcesoPersona,
        nombresPersona: posicion.nombresPersona,
        apellidoPaterno: posicion.apellidoPaterno,
        apellidoMaterno: posicion.apellidoMaterno,
        fotoPersona: posicion.fotoPersona,
        colorPosicion: posicion.colorPosicion,
        nombreCuadrante: posicion.nombreCuadrante,
        valor: posicion.valor,
        edd: posicion.edd,
        idCuadranteEq: posicion.idCuadranteEq,
        valorEdeEq: posicion.valorEdeEq,
        idCuadrante: posicion.idCuadrante,
        atributos: Enumerable.from(result[0][0]).where(`$.idPosicion == "${posicion.idPosicion}"`).select(function (atributo) {
          return {
            atributo: atributo.atributo,
            colorAtributo: atributo.colorAtributo,
            iconoAtributo: atributo.iconoAtributo,
            tooltipAtributo: atributo.tooltipAtributo,
          }
        }).toArray()

      }
    }).toArray()
    response.json(posiciones);
  }
}

module.exports = Persona
