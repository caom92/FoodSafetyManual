import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Language } from 'angular-l10n'
import { Events, Select } from 'ionic-angular'

import { DynamicComponentResolver } from '../../app/dynamic.resolver'
import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'

@Component({
  
})

export class DynamicNavbarPageComponent extends DynamicComponentResolver implements OnInit {
  @ViewChild('zone_select') zone_select: Select = null
  @ViewChild('language_select') language_select: Select = null
  @Language() lang: string

  pendingLogs: number = 0

  isDirector: boolean = null
  isEmployee: boolean = null
  isAdmin: boolean = null
  isSupervisor: boolean = null

  zone_array: Array<{ name: string, id: number }>

  constructor(public translationService: TranslationService, public events: Events, public storage: Storage, public server: BackendService, factoryResolver: ComponentFactoryResolver) {
    super(factoryResolver)
  }

  ngOnInit() {
    this.updatePendingLogs()

    this.assignFlags().then(success => {
      if (this.isDirector) {
        this.storage.get("zone_list").then(zone_list => {
          if(zone_list != null && zone_list != undefined){
            this.zone_array = zone_list
            this.storage.get("zone_id").then(zone_id => {
              this.zone_select.value = zone_id
            })
          } else {
            this.server.update(
              'list-zones',
              new FormData(),
              (response: any) => {
                this.zone_array = response.data
                this.storage.get("zone_id").then(zone_id => {
                  this.zone_select.value = zone_id
                })
                this.storage.set("zone_list", response.data)
              }
            )
          }
        })
      }
    })

    this.events.subscribe("pendingLog:total", (val) => {
      this.pendingLogs = val
    })
  }

  ionViewDidEnter() {
    if (this.isDirector) {
      this.storage.get("zone_id").then(zone_id => {
        this.zone_select.value = zone_id
      })
    }
  }

  updatePendingLogs() {
    this.storage.get("user_id").then(user_id => {
      if (user_id != null && user_id != undefined) {
        this.storage.get("pendingLogQueue").then(pending => {
          if (pending != undefined && pending != null) {
            if (pending[user_id] != null && pending[user_id] != undefined) {
              this.pendingLogs = pending[user_id].length
            }
          }
        })
      }
    })
  }

  openPendingLogsPage() {
    this.events.publish("open:pendingLogs", Date.now())
  }

  isEnglish() {
    return this.lang == "en"
  }

  isSpanish() {
    return this.lang == "es"
  }

  isDirectorFlag() {
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  assignFlags() {
    let flagPromise = new Promise<any>((resolve, reject) => {
      this.storage.get("role_name").then(role_name => {
        this.isAdmin = false
        this.isDirector = false
        this.isEmployee = false
        this.isSupervisor = false
        switch (role_name) {
          case 'Employee': this.isEmployee = true
            break
          case 'Supervisor': this.isSupervisor = true
            break
          case 'Director': this.isDirector = true
            break
          case 'Administrator': this.isAdmin = true
            break
        }
        resolve(true)
      })
    })

    return flagPromise
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  onZoneChange() {
    this.storage.get("zone_id").then(zone_id => {
      if (zone_id != this.zone_select.value) {
        let form = new FormData()
        form.append("zone_id", this.zone_select.value)
        this.server.update(
          'director-change-zones',
          form,
          (response: any) => {
            console.log("Cambio de zona")
            console.log(this.zone_select.value)
            console.log(response)
            this.storage.set("zone_id", Number(response.data.id))
            this.storage.set("zone_name", response.data.name)
          }
        )
      }
    })
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue)
    this.events.publish('language:changed', selectedValue, Date.now())
    console.log("Language changed from DynamicNavbarPageComponent super-component")
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}