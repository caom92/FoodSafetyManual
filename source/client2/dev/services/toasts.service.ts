import { Injectable } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'
import { MzToastService } from 'ngx-materialize'

@Injectable()
export class ToastsService {
  @Language() lang: string
  private readonly defaultTime: number = 3500
  private readonly defaultStyle: string = 'rounded'
  private readonly translationError: String = 'Missing translation error'

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

  private showString(text: string, time?: number, style?: string, callback?: Function): void {
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

  public showServerMessage(service: string, code: number, showOnSuccess: boolean = true, time: number = null): void {
    let translation = this.translationService.translate('ServiceMessages.' + service + '.' + String(code))

    if (translation === this.translationError) {
      // if you don't find the service and code, search for the generic message
      translation = this.translationService.translate('ServiceMessages.generic.' + String(code))
      if (translation === this.translationError) {
        // if no message is found among the generic errors, send the default message + service and error code
        translation = this.translationService.translate('ServiceMessages.default') + ' ' + service + '/' + code
      }
    }

    if (showOnSuccess == true || code != 0) {
      this.showString(translation, time, (code == 0) ? 'green rounded' : 'red rounded') 
    }
  }

  public showClientMessage(key: string, code: number, showOnSuccess: boolean = true, time: number = null): void {
    let translation = this.translationService.translate('ClientMessages.' + key)

    if (translation === this.translationError) {
      // if no message is found, send the default message + key for debugging
      translation = this.translationService.translate('ClientMessages.default') + ' ' + key
    }

    if (showOnSuccess == true || code != 0) {
      this.showString(translation, time, (code == 0) ? 'green rounded' : 'red rounded')
    }
  }
}
