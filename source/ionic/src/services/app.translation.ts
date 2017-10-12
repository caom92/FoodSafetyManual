import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { LocaleService, Language } from 'angular-l10n';

@Component({

})
export class TranslationService implements OnInit {
    @Language() lang: string;

    constructor(public locale: LocaleService, public storage: Storage) { }

    ngOnInit(): void { }

    selectLanguage(language: string): void {
        this.locale.setCurrentLanguage(language);
        this.storage.set("lang", language)
    }
}