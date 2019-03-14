import { Injectable } from '@angular/core'
import { Language, LocaleService } from 'angular-l10n'

@Injectable()
export class TranslationConfigService {
  @Language() lang: string
  
  constructor(public locale: LocaleService) { 

  }

  public selectLanguage(language: string, country?: string): void {
    if (country !== String(country)) {
      country = 'US'
    }
    this.locale.setDefaultLocale(language, country)
    this.locale.setCurrentCurrency('USD')
    localStorage.setItem('lang', language)
  }
}