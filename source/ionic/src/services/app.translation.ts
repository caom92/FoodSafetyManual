import { Component, OnInit } from '@angular/core';

import { LocaleService, Language } from 'angular-l10n';

@Component({

})
export class TranslationService implements OnInit {

    @Language() lang: string;

    constructor(public locale: LocaleService) { }

    ngOnInit(): void { }

    selectLanguage(language: string): void {
        this.locale.setCurrentLanguage(language);
    }

}