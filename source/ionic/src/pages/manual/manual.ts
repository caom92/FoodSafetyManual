import { Component, Input } from '@angular/core'
import { NavController, NavParams, ModalController, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { DomSanitizer } from '@angular/platform-browser'

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend'
import { ToastsService } from '../../services/app.toasts'

import { ManualUploadComponent } from './manual-upload/manual.upload'

@Component({
  selector: 'manual',
  templateUrl: 'manual.html'
})
export class ManualTab {
  @Language() lang: string
  @Input() manualSource: string

  manualDirectory: any
  logSuffix: string = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: Storage, private sanitizer: DomSanitizer, public modalController: ModalController) {
    this.manualSource = navParams.get('manualSource');
    this.logSuffix = navParams.get('logSuffix');
    //let urlBase = "http://manual.jfdc.tech/"
    let urlBase = "http://localhost/espresso/"
    this.manualDirectory = this.sanitizer.bypassSecurityTrustResourceUrl(urlBase + "external/ViewerJS/#../../" +  this.manualSource + "actual_manual.pdf")
  }

  openUploadModal(){
    console.log("open modal")
    let modal = this.modalController.create(ManualUploadComponent, {log_suffix:this.logSuffix})
    modal.present()
  }
}
