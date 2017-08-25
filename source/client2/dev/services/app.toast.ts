import { Injectable } from '@angular/core'
import { MzToastService } from 'ng2-materialize'

// Servicio que despliega mensajes en la pantalla para informar al usuario 
// sobre los resultados que sus acciones tuvieron
@Injectable()
export class ToastService
{
  // La lista de los diferentes mensajes informativos que se pueden desplegar, 
  // tanto en ingles como en español
  private static infoMessages = {
    es: {
      loggedIn: 'Sesión iniciada correctamente',
      passwordChanged: 'La contraseña se cambió exitosamente',
      usernameChanged: 'El nombre de usuario se cambió exitosamente'
    },
    en: {
      loggedIn: 'Logged in successfully',
      passwordChanged: 'The password was changed successfully',
      usernameChanged: 'The user name was changed successfully'
    }
  }

  // La lista de los diferentes mensajes de error que el servidor puede 
  // retornar, tanto en ingles como en español
  private static errorMessages = {
    es: {
      login: {
        1: 'Las credenciales son incorrectas'
      },
      'change-password': {
        1: 'La vieja contraseña es incorrecta'
      },
      'change-username': {
        1: 'El nombre ingresado ya fue reclamado',
        2: 'La contraseña es incorrecta'
      },
      101: 'Faltó enviar una entrada al servidor',
      102: 'Una entrada enviada al servidor no es un valor numérico',
      103: 'Una entrada enviada al servidor esta fuera del intervalo correcto',
      104: 'Una entrada enviada al servidor no es un número entero',
      105: 'Una entrada enviada al servidor no es un número real',
      106: 'Una entrada enviada al servidor no tiene la longitud de caracteres correcta',
      107: 'La longitud de caracteres de una entrada enviada al servidor no esta dentro del intervalo apropiado',
      108: 'Una entrada enviada al servidor no es una cadena',
      109: 'Una entrada enviada al servidor no es una cadena de correo electrónico',
      110: 'Una entrada enviada al servidor no es un valor lógico',
      111: 'Una entrada enviada al servidor no es una fecha o el formato es incorrecto',
      112: 'Una entrada enviada al servidor es un arreglo vacío',
      113: 'Un archivo enviado al servidor no es un documento',
      114: 'Un archivo enviado al servidor no es una imagen',
      115: 'No se pudo enviar un archivo al servidor',
      116: 'Una entrada enviada al servidor no es un número telefónico',
      117: 'No tiene el rol apropiado para usar este servicio',
      118: 'La sesión no ha sido iniciada',
      119: 'No está autorizado para usar este servicio'
    },
    en: {
      login: {
        1: 'Log in credentials are incorrect'
      },
      'change-password': {
        1: 'Current password is incorrect'
      },
      'change-username': {
        1: 'The user name is already taken',
        2: 'The password is incorrect'
      },
      101: 'A server input argument was not send',
      102: 'A server input argument is not a numeric value',
      103: 'A server input argument is outside the correct interval',
      104: 'A server input argument is not an integer',
      105: 'A server input argument is not a real number',
      106: "A server input argument doesn't have the proper character length",
      107: 'The character length of a server input argument is not within the proper interval',
      108: 'A server input argument is not a string',
      109: 'A server input argument is not an email string',
      110: 'A server input argument is not a boolean value',
      111: 'A server input argument is not a date or the format is incorrect',
      112: 'A server input argument is an empty array',
      113: 'A file sent to the server is not a document',
      114: 'A file sent to the server is not an image',
      115: 'A file could not be sent to the server',
      116: 'A server input argument is not a phone number',
      117: 'The user does not have the proper role to use this service',
      118: 'You are not logged in',
      119: 'You are not authorized to use this service'
    }
  }

  // El constructor de este servicio
  // hacemos uso del servicio de materialize para desplegar toasts
  constructor(private toastService: MzToastService) {
  }

  // Esta funcion despliega el texto que este asociado con el indice ingresado, 
  // si ningun texto esta asociado a dicho indice, entonces despliega el indice 
  // como si fuera el texto a desplegar
  // [in]   text: el indice que corresponde al mensaje a desplegar o el texto a 
  //        desplegar
  showText(text: string) {
    // primero, recuperamos el idioma del sistema
    let lang = localStorage.lang

    // luego revisamos si el texto ingresado corresponde a algun indice en la 
    // lista de mensajes
    if (ToastService.infoMessages[lang][text] !== undefined) {
      // si asi es, desplegamos el mensaje en el idioma elegido
      this.toastService.show(
        ToastService.infoMessages[lang][text], 
        3500, 
        'rounded'
      )  
    } else {
      // sino, desplegamos el indice asumiendo que se trata de un mensaje 
      // ingresado por el usuario
      this.toastService.show(text, 3500, 'rounded')
    }
  }

  // Despliega un mensaje de error que corresponda al nombre del servicio e 
  // informacion retornada por el servidor ingresados
  // [in]   service: el nombre del servicio que fue solicitado al servidor
  // [in]   meta: la informacion retornada del servidor sobre el estado del 
  //        servicio
  showServiceErrorText(service: string, meta: any) {
    // primero recuperamos el idioma del sistema
    let lang = localStorage.lang

    // luego recuperamos el codigo de error retornado por el servidor
    let code = meta.return_code

    // desplegamos el mensaje de error obtenido por el servidor en la consola 
    // del navegador
    console.error(`${ service } (${ code }): ${ meta.message }`)

    // revisamos si el codigo de error retornado corresponde a algun mensaje de 
    // error configurado para el servicio solicitado
    if (ToastService.errorMessages[lang][service][code] !== undefined) {
      // si asi fue, lo desplegamos
      this.toastService.show(
        ToastService.errorMessages[lang][service][code],
        3500, 'rounded'
      )
    } 

    // si no, revisamos si el codigo de error retornado corresponde a algun 
    // mensaje de error generico configurado
    else if (ToastService.errorMessages[lang][code] !== undefined) {
      // si asi fue, lo desplegamos
      this.toastService.show(
        ToastService.errorMessages[lang][code],
        3500, 'rounded'
      )

    // si no fue asi, simplemente desplegamos un mensaje generico
    } else {
      this.toastService.show(
        (lang == 'es') ?
          `Ocurrió un error desconocido: ${ code }`
          : `An unknown error occurred: ${ code }`,
        3500, 'rounded'
      )
    }
  }
}