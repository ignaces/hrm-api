const Database = use('Database')
const got = use('got')
var Enumerable = require('linq')
//jTest
class Tablet {

    async login({request,response}){

       
        const body = {
            "codigo": {
              "id": null,
              "mensaje": "Error de Login wassshoooooo"
            },
            "login": {
              "idusuario": "1005a3e85bc6df54"
            },
            "personas": {
              "persona": [
                {
                  "id": "1005a3e85bc6df54",
                  "nombres": "JULIO",
                  "ap_pat": "MONTANA",
                  "ap_mat": "BENGOA",
                  "urlFoto": "",
                  "rut": "6789543-2"
                },
                {
                  "id": "1015a3e85bc6df94",
                  "nombres": "MAY-LIN",
                  "ap_pat": "ALMENDRAS",
                  "ap_mat": "CHONG",
                  "urlFoto": "",
                  "rut": "98765432-2"
                }]
          },
          "evaluados": {
              "evaluado": [
                {
                  "id": "1",
                  "idOpinante": "1005a3e85bc6df54",
                  "idPersona": "1005a3e85bc6df54",
                  "idPerfil": "2",
                  "idProceso": "1",
                  "codigoOpinante": "AUT",
                  "cargo": "Cargo 1"
                },
                {
                  "id": "2",
                  "idOpinante": "1005a3e85bc6df54",
                  "idPersona": "1025a3e85bc6dfce",
                  "idPerfil": "2",
                  "idProceso": "1",
                  "codigoOpinante": "DESC",
                  "cargo": "Cargo 2"
                },
                {
                  "id": "3",
                  "idOpinante": "1005a3e85bc6df54",
                  "idPersona": "1035a3e85bc6e008",
                  "idPerfil": "3",
                  "idProceso": "1",
                  "codigoOpinante": "DESC",
                  "cargo": "Cargo 2"
                }],
          
              "evaluadoInstrumento": [
                {
                  "idEvaluado": "1",
                  "idInstrumento": "1",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "1",
                  "idInstrumento": "2",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "1",
                  "idInstrumento": "3",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "2",
                  "idInstrumento": "1",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "2",
                  "idInstrumento": "2",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "2",
                  "idInstrumento": "3",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "3",
                  "idInstrumento": "1",
                  "idEstado": "0"
                },
                {
                  "idEvaluado": "3",
                  "idInstrumento": "2",
                  "idEstado": "1"
                }]
          }
          }
        
        response.json(body);
    }
    
    async cargaInicial({request,response}){
        
               
        const body = {
            "estilo": {
              "urlLogo": "",
              "colorFondoCabecera": "#CCC",
              "colorFondoPrimario": "#e9ebee",
              "colorFondoSecundario": "#d2d6de",
              "colorBotonDefault": "#32c861",
              "colorBotonSync": "#81c9ff",
              "colorBotonSi": "#32c861",
              "colorBotonNo": "#f56954",
              "colorBotonNa": "#d2d6de",
              "colorNoIniciado": "orange",
              "colorEnProceso": "#81c9ff",
              "colorFinalizado": "#32c861"
            },
            "procesos": {
              "proceso": [
                {
                  "id": "1",
                  "nombre": "Proceso 2017"
                },
                {
                  "id": "2",
                  "nombre": "Proceso 2018"
                }
              ]
            },
            "angulos": {
              "tipoOpinante": [
                {
                  "id": "1",
                  "nombre": "Autoevaluación",
                  "codigoCorto": "AUT"
                },
                {
                  "id": "2",
                  "nombre": "Evaluados",
                  "codigoCorto": "DESC"
                },
                {
                  "id": "3",
                  "nombre": "Pares",
                  "codigoCorto": "PAR"
                },
                {
                  "id": "4",
                  "nombre": "Ascendente",
                  "codigoCorto": "ASC"
                },
                {
                  "id": "5",
                  "nombre": "Clientes",
                  "codigoCorto": "CLI"
                },
                {
                  "id": "6",
                  "nombre": "Otros",
                  "codigoCorto": "MAT"
                }
              ]
            },
            "instrumentos": {
              "tipoInstrumento": [
                {
                  "id": "1",
                  "nombre": "SOT"
                },
                {
                  "id": "2",
                  "nombre": "EIC"
                },
                {
                  "id": "3",
                  "nombre": "TCO"
                }
              ]
            },
            "competencias": {
              "competencia": [
                {
                  "id": "1",
                  "nombre": "Estrategia centrada en el cliente"
                },
                {
                  "id": "2",
                  "nombre": "Innovación abierta"
                },
                {
                  "id": "3",
                  "nombre": "Liderazgo Integrador"
                },
                {
                  "id": "4",
                  "nombre": "Agilidad en la Ejecución"
                },
                {
                  "id": "5",
                  "nombre": "Trabajo Colaborativo"
                }
              ]
            },
            "actividadesClave": {
              "actividadClave": [
                {
                  "id": "1",
                  "nombre": "Es capacidad de poner al cliente en el centro de cada decisión, sorprendiéndolo con soluciones integrales que le agreguen valor."
                },
                {
                  "id": "2",
                  "nombre": "Es la búsqueda constante de hacer las cosas diferente, atreviéndose a experimentar sin temor a equivocarse e incorporando mejores prácticas del entorno."
                },
                {
                  "id": "3",
                  "nombre": "Es la capacidad de energizar y desafiar al equipo, estableciendo una conexión con las personas a través de conversaciones honestas y valientes que potencien su desempeño, demostrando apertura a la diversidad y capitalizando las diferencias en función del logro de los objetivos."
                },
                {
                  "id": "4",
                  "nombre": "Es la capacidad de desafiar los tiempos de ejecución, demostrar disposición y agilidad frente a los cambios."
                },
                {
                  "id": "5",
                  "nombre": "Es la capacidad de comprometerse, involucrar a otros, haciendo propias iniciativas que van más allá de mi ámbito de responsabilidad y que aporten al beneficio de la Corporación."
                }
              ]
            },
            "criterios": {
              "criterio": [
                {
                  "id": "1",
                  "nombre": "Conectarse con la necesidad del cliente."
                },
                {
                  "id": "2",
                  "nombre": "Busca soluciones integrales que agreguen valor al cliente."
                },
                {
                  "id": "3",
                  "nombre": "Toma decisiones con foco en el cliente."
                },
                {
                  "id": "4",
                  "nombre": "Cuestionar el status quo al servicio del cliente / Negocio."
                },
                {
                  "id": "5",
                  "nombre": "Atreverse a experimentar."
                },
                {
                  "id": "6",
                  "nombre": "Explorar el ecosistema."
                },
                {
                  "id": "7",
                  "nombre": "Energizar y desafiar al equipo."
                },
                {
                  "id": "8",
                  "nombre": "Gestionar el Talento."
                },
                {
                  "id": "9",
                  "nombre": "Dar feedback honesto y valiente."
                },
                {
                  "id": "10",
                  "nombre": "Abrirse a la diversidad."
                },
                {
                  "id": "11",
                  "nombre": "Desafiar los Tiempos de Ejecución."
                },
                {
                  "id": "12",
                  "nombre": "Mostrar agilidad y disposición frente al Cambio."
                },
                {
                  "id": "13",
                  "nombre": "Buscar la Causa Raíz."
                },
                {
                  "id": "14",
                  "nombre": "Comprometerse con Iniciativas Transversales."
                },
                {
                  "id": "15",
                  "nombre": "Inspirar a Otros a ser parte de un Proyecto Común."
                }
              ]
            },
            "escalas": {
              "escala": [
                {
                  "id": "1",
                  "nombre": "Si",
                  "valor": "1",
                  "tipoEscala": "1"
                },
                {
                  "id": "2",
                  "nombre": "No",
                  "valor": "2",
                  "tipoEscala": "1"
                },
                {
                  "id": "3",
                  "nombre": "Nunca",
                  "valor": "0",
                  "tipoEscala": "2"
                },
                {
                  "id": "4",
                  "nombre": "A veces",
                  "valor": "1",
                  "tipoEscala": "2"
                },
                {
                  "id": "5",
                  "nombre": "Regularmente",
                  "valor": "3",
                  "tipoEscala": "2"
                },
                {
                  "id": "6",
                  "nombre": "Casi Siempre",
                  "valor": "4",
                  "tipoEscala": "2"
                },
                {
                  "id": "7",
                  "nombre": "Siempre",
                  "valor": "5",
                  "tipoEscala": "2"
                },
                {
                  "id": "8",
                  "nombre": "1",
                  "valor": "1",
                  "tipoEscala": "3"
                },
                {
                  "id": "9",
                  "nombre": "2",
                  "valor": "2",
                  "tipoEscala": "3"
                },
                {
                  "id": "10",
                  "nombre": "3",
                  "valor": "3",
                  "tipoEscala": "3"
                },
                {
                  "id": "11",
                  "nombre": "4",
                  "valor": "4",
                  "tipoEscala": "3"
                },
                {
                  "id": "12",
                  "nombre": "5",
                  "valor": "5",
                  "tipoEscala": "3"
                }
              ]
            },
            "perfiles": {
              "perfil": [
                {
                  "id": "1",
                  "nombre": "Jefatura"
                },
                {
                  "id": "2",
                  "nombre": "Ejecutivo"
                },
                {
                  "id": "3",
                  "nombre": "Administrativo"
                },
                {
                  "id": "4",
                  "nombre": "Gerencia"
                }
              ]
            }
          }


        response.json(body);
    }

}

module.exports = Tablet
