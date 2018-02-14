import { Injectable, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Language } from 'angular-l10n'
import { Events, ToastController } from 'ionic-angular'

// Servicio que despliega mensajes en la pantalla para informar al usuario 
// sobre los resultados que sus acciones tuvieron
@Injectable()
export class ToastsService implements OnInit
{
  @Language() lang: string

  // La lista de los diferentes mensajes informativos que se pueden desplegar, 
  // tanto en ingles como en español
  private static infoMessages = {
    es: {
      loggedIn: 'Sesión iniciada correctamente',
      passwordChanged: 'La contraseña se cambió exitosamente',
      usernameChanged: 'El nombre de usuario se cambió exitosamente',
      capturedLog: 'Se ha enviado la bitácora exitosamente',
      incompleteLog: 'Error; hay algunos campos sin llenar',
      failedLogToQueue: 'La bitácora no pudo ser enviada, se enviará en cuanto se conecte nuevamente a una red',
      serverUnreachable: 'Servidor inalcanzable',
      lastActionReverseNetwork: 'Su última acción se revirtió debido a un error en la conexión',
      lastActionReverseBadRequest: 'Su última acción se revirtió debido a un error en la aplicación; notifique al administrador',
      badRequest: 'Hubo un error en la aplicación; notifique al administrador',
      itemAddSuccess: 'Elemento añadido con éxito',
      itemChargeSuccess: 'Elemento activado exitosamente',
      itemDischargeSuccess: 'Elemento desactivado exitosamente',
      areaEditSuccess: 'Nombre de área cambiado exitosamente',
      serverTakingTooLong: 'Existe un error en la conexión o el servidor está tardando demasiado en responder',
      notAvailableInMobile: 'Esta característica aun no está disponible en la versión móvil'
    },
    en: {
      loggedIn: 'Logged in successfully',
      passwordChanged: 'The password was changed successfully',
      usernameChanged: 'The user name was changed successfully',
      capturedLog: 'The log has been sent succesfully',
      incompleteLog: 'Error; some fields aren\'t filled',
      failedLogToQueue: 'The log could not be send, it will be added when you connect again to a network',
      serverUnreachable: 'Server Unreachable',
      lastActionReverseNetwork: 'Your last action was undone due to a network error',
      lastActionReverseBadRequest: 'Your last action was undone due to an app error; notify the administrator',
      badRequest: 'There was an app error; notify the administrator',
      itemAddSuccess: 'Item added successfully',
      itemChargeSuccess: 'Item activated successfully',
      itemDischargeSuccess: 'Item deactivated successfully',
      areaEditSuccess: 'Area name changed succesfully',
      serverTakingTooLong: 'There is an error in your connection or the server is taking too long to respond',
      notAvailableInMobile: 'This feature is not yet available in the mobile version'
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
  constructor(private toastService: ToastController, public events: Events, public storage: Storage) {
    this.events.subscribe("language:changed", (lang, time) => {
      this.lang = lang
    })

    this.events.subscribe("user:loggedIn", (time, lang) => {
      this.lang = lang
    })

    this.ngOnInit()
  }

  ngOnInit(){
    this.storage.get('lang').then(
      lang => {
        if(lang == 'en' || lang == 'es'){
          this.lang = lang
        } else {

          //console.log("Toast service changing language to es")
          this.lang = 'es'
          this.storage.set('lang', 'es')
          this.events.publish("language:changed", "es", Date.now())
        }
      },
      error => {
        let tempToast = this.toastService.create({
          message: "Lang completely undefined",
          duration: 3500,
          position: 'bottom'
        })

        tempToast.present()
      }
    )
  }

  showString(text: string) {
    // si asi es, desplegamos el mensaje en el idioma elegido
    let toast = this.toastService.create({
      message: text,
      duration: 3500, 
      position: 'bottom'
    })

    toast.present()
  }

  // Esta funcion despliega el texto que este asociado con el indice ingresado, 
  // si ningun texto esta asociado a dicho indice, entonces despliega el indice 
  // como si fuera el texto a desplegar
  // [in]   text: el indice que corresponde al mensaje a desplegar o el texto a 
  //        desplegar
  showText(text: string) {
    // primero, recuperamos el idioma del sistema
    let lang = this.lang
    let toast

    // luego revisamos si el texto ingresado corresponde a algun indice en la 
    // lista de mensajes
    if (ToastsService.infoMessages[lang][text] !== undefined) {
      let toastMessage = ToastsService.infoMessages[lang][text]
      // si asi es, desplegamos el mensaje en el idioma elegido
      toast = this.toastService.create({
        message: toastMessage,
        duration: 3500, 
        position: 'bottom'
      })

      toast.present()
    } else {
      // sino, desplegamos el indice asumiendo que se trata de un mensaje 
      // ingresado por el usuario
      toast = this.toastService.create({
        message: text,
        duration: 3500, 
        position: 'bottom'
      })

      toast.present()
    }
  }

  // Despliega un mensaje de error que corresponda al nombre del servicio e 
  // informacion retornada por el servidor ingresados
  // [in]   service: el nombre del servicio que fue solicitado al servidor
  // [in]   meta: la informacion retornada del servidor sobre el estado del 
  //        servicio
  showServiceErrorText(service: string, meta: any) {
    // primero recuperamos el idioma del sistema
    let lang = this.lang
    let toast
    let toastMessage

    // luego recuperamos el codigo de error retornado por el servidor
    let code = meta.return_code

    // desplegamos el mensaje de error obtenido por el servidor en la consola 
    // del navegador
    console.error(`${ service } (${ code }): ${ meta.message }`)

    // revisamos si el codigo de error retornado corresponde a algun mensaje de 
    // error configurado para el servicio solicitado
    if (ToastsService.errorMessages[lang][service][code] !== undefined) {
      toastMessage = ToastsService.errorMessages[lang][service][code]
      // si asi fue, lo desplegamos
      toast = this.toastService.create({
        message: toastMessage,
        duration: 3500, 
        position: 'bottom'
      })

      toast.present()
    } 

    // si no, revisamos si el codigo de error retornado corresponde a algun 
    // mensaje de error generico configurado
    else if (ToastsService.errorMessages[lang][code] !== undefined) {
      toastMessage = ToastsService.errorMessages[lang][code]
      // si asi fue, lo desplegamos
      toast = this.toastService.create({
        message: toastMessage,
        duration: 3500, 
        position: 'bottom'
      })
      
      toast.present()

    // si no fue asi, simplemente desplegamos un mensaje generico
    } else {
      toast = this.toastService.create({
        message: (lang == 'es') ? `Ocurrió un error desconocido: ${ code }` : `An unknown error occurred: ${ code }`,
        duration: 3500, 
        position: 'bottom'
      })

      toast.present()
    }
  }
}