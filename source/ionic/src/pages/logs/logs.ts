import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Select, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

import { GMPPackingPreopPage } from './gmp-packing-preop/gmp.packing.preop'

import { InventoryLoaderComponent } from '../inventories/inventories'

@Component({
  selector: 'logs',
  templateUrl: 'logs.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})
export class LogsPage {
  @ViewChild('zone_select') zone_select: Select
  @ViewChild('language_select') language_select: Select
  @Language() lang: string

  selectedProgram: any
  selectedModule: any
  logs: Array<{title: string, icon: string, program: any, module: any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private toastService: ToastService) {
    // Tenemos que ver desde qué programa se llamó esta vista
    this.selectedProgram = navParams.get('program');
    this.selectedModule = navParams.get('module');

    this.logs = [];

    storage.get("privileges").then(
        data => {
          data = JSON.parse(data)
          var tempArray = Object.getOwnPropertyNames(data[data.zones[0].name][this.selectedProgram.code].names[this.selectedModule.title])
          let invArray = data[data.zones[0].name][this.selectedProgram.code].names[this.selectedModule.title]
          console.log("AQUI LINCE")
          console.log(tempArray)
          for(var mod of tempArray){
            if(this.selectedProgram.target == "log"){
              this.logs.push({
                title: mod,
                icon: "clipboard",
                program: this.selectedProgram,
                module: this.selectedModule
              });
            } else {
              if(invArray[mod].has_inventory == "1"){
                this.logs.push({
                  title: mod,
                  icon: "clipboard",
                  program: this.selectedProgram,
                  module: this.selectedModule
                });
              }
            }
          }
        }
      )
  }

  itemTapped(event, item) {
    console.log("item tapped")
    console.log(event)
    console.log(item)
    this.storage.get("privileges").then(
      data => {
        data = JSON.parse(data)
        console.log(data)
        var tempArray = data[data.zones[0].name][this.selectedProgram.code].names[this.selectedModule.title]
        console.log(tempArray[item.title])
        if(tempArray[item.title].suffix == "gmp-packing-preop" || tempArray[item.title].suffix == "gmp-packing-hand-washing" || tempArray[item.title].suffix == "gmp-packing-glass-brittle" || tempArray[item.title].suffix == "gmp-packing-scale-calibration" || tempArray[item.title].suffix == "gap-packing-preop" || tempArray[item.title].suffix == "gmp-packing-scissors-knives" || tempArray[item.title].suffix == "gmp-packing-thermo-calibration" || tempArray[item.title].suffix == "gmp-packing-cold-room-temp"){
          if(this.selectedProgram.target == "log"){
            this.navCtrl.push(GMPPackingPreopPage, {log_suffix: tempArray[item.title].suffix, log_title: item.title})
          }
          else{
            if(tempArray[item.title].suffix == "gmp-packing-scale-calibration" || tempArray[item.title].suffix == "gmp-packing-preop"){
              console.log("ScaleCalibration paps")
              this.navCtrl.push(InventoryLoaderComponent, {log_suffix: tempArray[item.title].suffix, log_title: item.title})
            }
          }
        } else {
          this.toastService.showText("notAvailableInMobile")
        }
      }
    )
    
    /*TODO: Cargar las pantallas de cada bitácora individual*/
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
