import { Component, Input } from '@angular/core';
import { NavController, NavParams, Select, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

@Component({
  selector: 'manual',
  templateUrl: 'manual.html'
})
export class ManualTab {
  @Language() lang: string

  @Input() manualSource: string

  manualDirectory: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private sanitizer: DomSanitizer) {
    this.manualSource = navParams.get('manualSource');
    this.manualDirectory=this.sanitizer.bypassSecurityTrustResourceUrl("http://manual.jfdc.tech/external/ViewerJS/#../../" +  this.manualSource + "actual_manual.pdf")
    //"gmp/packing/preop/law/"
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

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}
