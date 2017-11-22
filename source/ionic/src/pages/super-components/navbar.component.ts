import { ViewChild, OnInit } from '@angular/core'

import { NavController, NavParams, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../services/app.translation'

import { PendingCardListComponent } from '../pending-logs/pending-card-list/pending.card.list.component'

export class NavbarPageComponent implements OnInit {
  @ViewChild('zone_select') zone_select: Select = null
  @ViewChild('language_select') language_select: Select = null
  @Language() lang: string

  pendingLogs: number = 0
  
  isDirector: boolean = null
  isEmployee: boolean = null
  isAdmin: boolean = null
  isSupervisor: boolean = null

  constructor(public translationService: TranslationService, public events: Events, public storage: Storage) {

  }

  ngOnInit() {
    this.updatePendingLogs()

    this.assignFlags()

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

  openPendingLogsPage(){
    this.events.publish("open:pendingLogs", Date.now())
    /*this.storage.get("user_id").then(user_id => {
      if(user_id != null && user_id != undefined){
        this.storage.get("pendingLogQueue").then(pending => {
          if(pending != undefined && pending != null){
            if(pending[user_id] != null && pending[user_id] != undefined){
              console.log(pending[user_id])
            }
          }
        })
      }
    })*/
  }

  isEnglish() {
    return this.lang == "en"
  }

  isSpanish() {
    return this.lang == "es"
  }

  isDirectorFlag() {
    this.isDirector = localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  assignFlags(){
    this.storage.get("role_name").then(role_name =>{
      this.isAdmin = false
      this.isDirector = false
      this.isEmployee = false
      this.isSupervisor = false
      switch(role_name){
        case 'Employee': this.isEmployee = true
          break
        case 'Supervisor': this.isSupervisor = true
          break
        case 'Director': this.isDirector = true
          break
        case 'Administrator': this.isAdmin = true
          break
      }
    })
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