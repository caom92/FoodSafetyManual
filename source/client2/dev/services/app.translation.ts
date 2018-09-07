import { Component, OnInit } from '@angular/core'
import { LocaleService, Language } from 'angular-l10n'

@Component({

})

export class TranslationService implements OnInit {
  @Language() lang: string
  
  constructor(public locale: LocaleService) { 

  }

  public ngOnInit(): void { 

  }

  public selectLanguage(language: string, country?: string): void {
    //this.locale.setCurrentLanguage(language)
    if (country == undefined) {
      country = 'US'
    }
    this.locale.setDefaultLocale(language, country)
    this.locale.setCurrentCurrency('USD')
    /*setTimeout(function () {
      $('select').material_select()
    }, 200)*/
    localStorage.setItem('lang', language)
  }
}