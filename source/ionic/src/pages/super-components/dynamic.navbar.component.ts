import { ViewChild, ComponentFactoryResolver } from '@angular/core'

import { NavController, NavParams, Select, Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../services/app.translation'

import { DynamicComponentResolver } from '../../app/dynamic.resolver'

export class DynamicNavbarPageComponent extends DynamicComponentResolver{
  @ViewChild('zone_select') zone_select: Select = null
  @ViewChild('language_select') language_select: Select = null
  @Language() lang: string

  constructor(public translationService: TranslationService, public events: Events, factoryResolver: ComponentFactoryResolver) {
    super(factoryResolver)
  }

  isEnglish(){
    return this.lang == "en"
  }

  isSpanish(){
    return this.lang == "es"
  }

  isDirector(){
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}