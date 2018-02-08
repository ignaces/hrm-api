'use strict'
const got = use('got')

/**
 * Notificaciones
 * @class
 */
class Notificaciones {

    async send ({request,response}){
        const to =request.input('to') ;
        const subject =request.input('subject') ;
        const body =`<!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
        <!--StartFragment-->
        <p><img style="float: left;" src="http://assets.enovum.cl/images/logobanmedica.jpg" alt="" width="171" height="145" /><img style="float: left;" src="http://assets.enovum.cl/images/logovidatres.jpg" alt="" width="245" height="144" /></p>
        <p><img style="float: right;" src="http://assets.enovum.cl/images/logofch.jpg" alt="" width="241" height="145" /></p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <table class="MsoTableGrid" style="border-collapse: collapse; border: none; height: 466px;" border="0" width="1280" cellspacing="0" cellpadding="0">
        <tbody>
        <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">
        <td style="width: 1552px; padding: 0cm 5.4pt;" colspan="2" valign="top">
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;">&nbsp;</p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">Estimada/o [Nombres] [Apellido Paterno] [Apellido Materno]:</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">Hoy se inicia el periodo para responder la encuesta del proyecto Transformaci&oacute;n de nuestra empresa, en el cual se explorar&aacute; el nivel de disposici&oacute;n para el cambio que existe en la organizaci&oacute;n. </span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">A partir de esta encuesta, buscamos conocer la realidad organizacional de Banmedica-Vida Tres, para as&iacute; definir acciones que nos permitan llevar a cabo el cambio cultural.</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span style="font-family: arial, helvetica, sans-serif;"><strong style="mso-bidi-font-weight: normal;"><span lang="ES-CL">Todas las respuestas obtenidas ser&aacute;n confidenciales</span></strong><span lang="ES-CL"> y analizadas s&oacute;lo por el equipo consultor de Fundaci&oacute;n Chile, quienes luego entregar&aacute;n resultados generales y nunca de manera individual, resguardando la confidencialidad en todo momento.</span></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span style="font-family: arial, helvetica, sans-serif;"><strong style="mso-bidi-font-weight: normal;"><span lang="ES-CL">&nbsp;</span></strong></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span style="font-family: arial, helvetica, sans-serif;"><strong style="mso-bidi-font-weight: normal;"><span lang="ES-CL">La encuesta estar&aacute; activa s&oacute;lo hasta este <u>viernes 16 de febrero a las 23:59 hrs.</u></span></strong></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span style="font-family: arial, helvetica, sans-serif;"><span lang="ES-CL">Para contestar la encuesta debes dirigirte al sitio https://banmedica-vidatres.questionpro.com/ e ingresar el siguiente c&oacute;digo </span><span lang="ES-CL" style="font-size: 9.0pt;">(se recomienda copiar y pegar directamente en el sistema)</span><span lang="ES-CL">:</span></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="text-align: justify; text-justify: inter-ideograph; line-height: normal; background: #EEECE1; mso-background-themecolor: background2; margin: 0cm 27.0pt .0001pt 21.3pt;"><span style="font-family: arial, helvetica, sans-serif;"><strong style="mso-bidi-font-weight: normal;"><span lang="ES-CL">&nbsp;</span></strong></span></p>
        <p class="MsoNormal" style="text-align: justify; text-justify: inter-ideograph; line-height: normal; background: #EEECE1; mso-background-themecolor: background2; margin: 0cm 27.0pt .0001pt 21.3pt;"><span lang="ES-CL" style="font-size: 14pt; font-family: arial, helvetica, sans-serif;"><span style="mso-spacerun: yes;">&nbsp; </span><strong style="mso-bidi-font-weight: normal;">Contrase&ntilde;a:</strong> [RUT]</span></p>
        <p class="MsoNormal" style="text-align: justify; text-justify: inter-ideograph; line-height: normal; background: #EEECE1; mso-background-themecolor: background2; margin: 0cm 27.0pt .0001pt 21.3pt;"><span style="font-family: arial, helvetica, sans-serif;"><span lang="ES-CL" style="font-size: 8.0pt; mso-bidi-font-size: 11.0pt; color: #7f7f7f; mso-themecolor: text1; mso-themetint: 128;"><span style="mso-spacerun: yes;">&nbsp;</span></span></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <div style="mso-element: para-border-div; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 1.0pt 4.0pt 1.0pt 4.0pt;">
        <p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal; border: none; mso-border-alt: solid windowtext .5pt; padding: 0cm; mso-padding-alt: 1.0pt 4.0pt 1.0pt 4.0pt;"><span style="font-family: arial, helvetica, sans-serif;"><span lang="ES-CL" style="font-size: 9.0pt; mso-bidi-font-size: 11.0pt; color: #404040; mso-themecolor: text1; mso-themetint: 191;">Recuerda que <u>cada link<span style="mso-spacerun: yes;">&nbsp; </span>es &uacute;nico e intransferible</u>, </span><strong style="mso-bidi-font-weight: normal;"><span lang="ES-CL" style="font-size: 9.0pt; mso-bidi-font-size: 11.0pt; color: red;">no debe ser reenviado o utilizado por otras personas</span></strong><span lang="ES-CL" style="font-size: 9.0pt; mso-bidi-font-size: 11.0pt; color: #404040; mso-themecolor: text1; mso-themetint: 191;">. Esto no s&oacute;lo entorpecer&iacute;a enormemente el servicio de soporte, sino que adem&aacute;s </span><u><span lang="ES-CL" style="font-size: 9.0pt; mso-bidi-font-size: 11.0pt; color: #595959; mso-themecolor: text1; mso-themetint: 166;">podr&iacute;a llegar a afectar la informaci&oacute;n que ya est&aacute; guardada en la plataforma</span></u><span lang="ES-CL" style="font-size: 9.0pt; mso-bidi-font-size: 11.0pt; color: #595959; mso-themecolor: text1; mso-themetint: 166;">.</span></span></p>
        </div>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">En caso de dificultades t&eacute;cnicas puedes escribir al siguiente correo: <span style="mso-spacerun: yes;">&nbsp;</span><a href="mailto:felipe.dosal@fch.cl">felipe.dosal@fch.cl</a> <span style="mso-spacerun: yes;">&nbsp;</span></span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">Agradecemos tu participaci&oacute;n en esta encuesta, que es fundamental para el proceso que estamos viviendo como empresa. </span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">Se despide cordialmente,</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: justify; text-justify: inter-ideograph; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">Isapre Banmedica-Vida Tres / Fundaci&oacute;n Chile</span></p>
        </td>
        </tr>
        <tr style="mso-yfti-irow: 1; mso-yfti-lastrow: yes;">
        <td style="width: 775px; padding: 0cm 5.4pt;">
        <p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        </td>
        <td style="width: 777px; padding: 0cm 5.4pt;">
        <p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span lang="ES-CL" style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></p>
        </td>
        </tr>
        </tbody>
        </table>
        <p><span style="font-family: arial, helvetica, sans-serif;"> <!--EndFragment--></span></p>
        </body>
        </html>`
        const tag =request.input('tag') ;

        const email =request.input('email') ;
        var options_auth = new Buffer("api:key-2108efde358f1149e5e116f115c8047d").toString("base64")
        var query = {
            from:"enovum@fch.cl",
            to:to,
            html:body,
            subject:subject,
            "o:tag":tag
        }
        
      const rStats = await got.post(`https://api.mailgun.net/v3/mg.enovum.cl/messages`,
        {
          form:true,
          body: query,
          headers:{
            'Authorization': "Basic "+options_auth
          }      
        })
       
      return rStats.body;

    }

    
    
}

module.exports = Notificaciones
