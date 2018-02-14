import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Language, LocaleService } from 'angular-l10n'

@Component({

})

export class TranslationService implements OnInit {
  @Language() lang: string
  
  constructor(public locale: LocaleService, public storage: Storage) { 

  }

  public ngOnInit(): void { 

  }

  public selectLanguage(language: string): void {
    this.locale.setCurrentLanguage(language)
    this.locale.setDefaultLocale(language, "US");
    this.locale.setCurrentCurrency("USD");
    this.storage.set("lang", language)
  }
}