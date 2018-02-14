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

  public selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language)
    /*setTimeout(function () {
      $("select").material_select()
    }, 200)*/
    localStorage.lang = language
  }
}