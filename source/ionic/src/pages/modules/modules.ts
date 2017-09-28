import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Select, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';
import { LogsPage } from '../logs/logs'

@Component({
  selector: 'modules',
  templateUrl: 'modules.html'
})
export class ModulesPage {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  selectedProgram: any;
  modules: Array<{title: string, icon: string, program: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage) {
    // Tenemos que ver desde qué programa se llamó esta vista
    this.selectedProgram = navParams.get('program');

    this.modules = [];

    storage.get("privileges").then(
        data => {
          data = JSON.parse(data)
          var tempArray = Object.getOwnPropertyNames(data[data.zones[0].name][this.selectedProgram.title].names)
          for(var mod of tempArray){
            this.modules.push({
              title: mod,
              icon:"cube",
              program: this.selectedProgram
            });
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
