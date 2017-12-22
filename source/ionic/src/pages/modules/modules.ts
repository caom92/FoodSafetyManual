import { Component, ViewChild } from '@angular/core'
import { NavController, NavParams, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { NavbarPageComponent } from '../super-components/navbar.component'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

import { LogsPage } from '../logs/logs'

@Component({
  selector: 'modules',
  templateUrl: 'modules.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class ModulesPage extends NavbarPageComponent {
  @Language() lang: string

  selectedProgram: any
  modules: Array<{ title: string, icon: string, program: any }>

  constructor(public navCtrl: NavController, public navParams: NavParams, public translationService: TranslationService, public events: Events, public storage: Storage, public server: BackendService) {
    super(translationService, events, storage, server)
    // Tenemos que ver desde qué programa se llamó esta vista
    this.selectedProgram = navParams.get('program')

    this.modules = [];

    storage.get("privileges").then(
      data => {
        data = JSON.parse(data)
        let tempArray = Object.getOwnPropertyNames(data[data.zones[0].name][this.selectedProgram.code].names)
        let invArray = data[data.zones[0].name][this.selectedProgram.code].names
        if (this.selectedProgram.target == "log") {
          for (var mod of tempArray) {
            this.modules.push({
              title: mod,
              icon: "cube",
              program: this.selectedProgram
            })
          }
        } else {
          let hasInventoryFlag = false;
          for (let inv in invArray) {
            hasInventoryFlag = false
            for (let log in invArray[inv]) {
              if (invArray[inv][log].has_inventory == 1) {
                hasInventoryFlag = true
              }
            }
            if (hasInventoryFlag) {
              this.modules.push({
                title: inv,
                icon: "cube",
                program: this.selectedProgram
              })
            }
          }
        }
      }
    )
  }

  itemTapped(event, program, module) {
    this.navCtrl.push(LogsPage, {
      program: program,
      module: module
    });
  }
}
