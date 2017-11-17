import { ViewChild, OnInit } from '@angular/core'

import { NavController, NavParams, Select, Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../services/app.translation'

export class NavbarPageComponent implements OnInit {
  @ViewChild('zone_select') zone_select: Select = null
  @ViewChild('language_select') language_select: Select = null
  @Language() lang: string

  pendingLogs: number = 0

  constructor(public translationService: TranslationService, public events: Events) {
    
  }

  ngOnInit(){
    this.events.subscribe("pendingLog:add", (val)=>{
      this.pendingLogs++
    })

    this.events.subscribe("pendingLog:total", (val)=>{
      this.pendingLogs = val
    })

    this.events.subscribe("pendingLog:substract", (val)=>{
      this.pendingLogs--
    })
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