import { ViewChild, OnInit } from '@angular/core'

import { NavController, NavParams, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../services/app.translation'

export class NavbarPageComponent implements OnInit {
  @ViewChild('zone_select') zone_select: Select = null
  @ViewChild('language_select') language_select: Select = null
  @Language() lang: string

  pendingLogs: number = 0

  constructor(public translationService: TranslationService, public events: Events, public storage: Storage) {

  }

  ngOnInit() {
    this.updatePendingLogs()

    this.events.subscribe("pendingLog:total", (val) => {
      this.pendingLogs = val
    })
  }

  updatePendingLogs(){
    this.storage.get("user_id").then(user_id => {
      if(user_id != null && user_id != undefined){
        this.storage.get("pendingLogQueue").then(pending => {
          if(pending != undefined && pending != null){
            if(pending[user_id] != null && pending[user_id] != undefined){
              this.pendingLogs = pending[user_id].length
            }
          }
        })
      }
    })
  }

  isEnglish() {
    return this.lang == "en"
  }

  isSpanish() {
    return this.lang == "es"
  }

  isDirector() {
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