import { Injectable } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'
import { MzToastService } from 'ngx-materialize'

// Servicio que despliega mensajes en la pantalla para informar al usuario 
// sobre los resultados que sus acciones tuvieron
@Injectable()
export class ToastsService {
  @Language() lang: string
  private readonly defaultTime: number = 3500
  private readonly defaultStyle: string = 'rounded'

  // La lista de los diferentes mensajes informativos que se pueden desplegar, 
  // tanto en ingles como en español
  private static infoMessages = {
    es: {
      loggedIn: 'Sesión iniciada correctamente',
      passwordChanged: 'La contraseña se cambió exitosamente',
      usernameChanged: 'El nombre de usuario se cambió exitosamente',
      capturedLog: 'Se ha enviado la bitácora exitosamente',
      updatedLog: 'Se ha actualizado la bitácora exitosamente',
      incompleteLog: 'Error; hay algunos campos sin llenar',
      failedLogToQueue: 'La bitácora no pudo ser enviada, se enviará en cuanto se conecte nuevamente a una red',
      serverUnreachable: 'Servidor inalcanzable',
      lastActionReverseNetwork: 'Su última acción se revirtió debido a un error en la conexión',
      lastActionReverseBadRequest: 'Su última acción se revirtió debido a un error en la aplicación; notifique al administrador',
      badRequest: 'Hubo un error en la aplicación; notifique al administrador',
      itemAddSuccess: 'Elemento añadido con éxito',
      itemAddFail: 'Elemento no válido, revise los campos señalados',
      itemChargeSuccess: 'Elemento activado exitosamente',
      itemDischargeSuccess: 'Elemento desactivado exitosamente',
      serverTakingTooLong: 'Existe un error en la conexión o el servidor está tardando demasiado en responder',
      notAvailableInMobile: 'Esta característica aun no está disponible en la versión móvil',
      noReportsFound: 'No se encontraron reportes para el rango de fechas seleccionado'
    },
    en: {
      loggedIn: 'Logged in successfully',
      passwordChanged: 'The password was changed successfully',
      usernameChanged: 'The user name was changed successfully',
      capturedLog: 'The log has been sent succesfully',
      updatedLog: 'The log has been updated succesfully',
      incompleteLog: 'Error; some fields aren\'t filled',
      failedLogToQueue: 'The log could not be send, it will be added when you connect again to a network',
      serverUnreachable: 'Server Unreachable',
      lastActionReverseNetwork: 'Your last action was undone due to a network error',
      lastActionReverseBadRequest: 'Your last action was undone due to an app error; notify the administrator',
      badRequest: 'There was an app error; notify the administrator',
      itemAddSuccess: 'Item added successfully',
      itemAddFail: 'Item not valid, check the marked fields',
      itemChargeSuccess: 'Item activated successfully',
      itemDischargeSuccess: 'Item deactivated successfully',
      serverTakingTooLong: 'There is an error in your connection or the server is taking too long to respond',
      notAvailableInMobile: 'This feature is not yet available in the mobile version',
      noReportsFound: 'No reports were found for the selected date range'
    }
  }

  constructor(private mzToastService: MzToastService, private translationService: TranslationService) {
    this.initLanguage()
  }

  private initLanguage(): void {
    let lang = localStorage.getItem('lang')

    if (lang == 'en' || lang == 'es') {
      this.lang = lang
    } else {
      this.lang = 'es'
      localStorage.setItem('lang', 'es')
    }
  }

  public showString(text: string, time?: number, style?: string, callback?: Function): void {
    let toastTime = (time === Number(time)) ? time : this.defaultTime
    let toastStyle = (style === String(style)) ? style : this.defaultStyle
    if (text === String(text)) {
      if (callback instanceof Function) {
        this.mzToastService.show(text, toastTime, toastStyle, callback)
      } else {
        this.mzToastService.show(text, toastTime, toastStyle)
      }
    }
  }

  public showServerMessage(service: string, code: number): void {
    let translation = this.translationService.translate('ServiceMessages.' + service + '.' + String(code))

    if (translation === 'Missing translation error') {
      // if you don't find the service and code, search for the generic message
      translation = this.translationService.translate('ServiceMessages.generic.' + String(code))
      if (translation === 'Missing translation error') {
        // if no message is found among the generic errors, send the default message + service and error code
        translation = this.translationService.translate('ServiceMessages.default') + ' ' + service + '/' + code
      }
    }

    this.showString(translation, null, (code == 0) ? 'green rounded' : 'red rounded')
  }

  public showClientMessage(key: string): void {
    let translation = this.translationService.translate('ClientMessages.' + key)

    if (translation === 'Missing translation error') {
      // if no message is found, send the default message + key for debugging
      translation = this.translationService.translate('ClientMessages.default') + ' ' + key
    }

    this.showString(translation)
  }

  public showText(text: string): void {
    // primero, recuperamos el idioma del sistema
    let lang = this.lang

    // luego revisamos si el texto ingresado corresponde a algun indice en la 
    // lista de mensajes
    if (ToastsService.infoMessages[lang][text] !== undefined) {
      let toastMessage = ToastsService.infoMessages[lang][text]
      // si asi es, desplegamos el mensaje en el idioma elegido
      this.mzToastService.show(
        toastMessage,
        this.defaultTime,
        'bottom'
      )
    } else {
      // sino, desplegamos el indice asumiendo que se trata de un mensaje 
      // ingresado por el usuario
      this.mzToastService.show(
        text,
        this.defaultTime,
        'bottom'
      )
    }
  }
}