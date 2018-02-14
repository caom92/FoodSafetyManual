import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { NavController, NavParams, ModalController, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { DomSanitizer } from '@angular/platform-browser'

import { Language } from 'angular-l10n'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

import { ManualUploadComponent } from './manual-upload/manual.upload'
import { Observable } from 'rxjs/Observable';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service'

@Component({
  selector: 'manual',
  templateUrl: 'manual.html'
})
export class ManualTab implements OnInit {
  @Language() lang: string
  @ViewChild("manualFrame") iFrame: HTMLIFrameElement
  @Input() manualSource: string

  manualDirectory: SafeResourceUrl
  logSuffix: string = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private sanitizer: DomSanitizer, public modalController: ModalController, private server: BackendService) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    console.log("loading manual...")
    this.logSuffix = this.navParams.get('logSuffix')
    console.log(this.logSuffix)
    this.storage.get("zone_name").then((zone_name) => {
      let manualFormData = new FormData()

      manualFormData.append("log-suffix", this.logSuffix)
      this.server.update(
        'get-log-manual-url',
        manualFormData,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              console.log(response.data)
              let urlBase = "http://manual.jfdc.tech/"
              //let urlBase = "http://localhost/espresso/"
              this.manualDirectory = this.sanitizer.bypassSecurityTrustResourceUrl(urlBase + "external/ViewerJS/#../../" +  response.data.manual_location + zone_name.toLowerCase() + "/" + "actual_manual.pdf")
              //this.navCtrl.parent.select(1)
            }
          } else {
            this.navCtrl.parent.select(1)
            //"Error durante la solicitud"
          }
        },
        (error: any, caught: Observable<void>) => {
          this.navCtrl.parent.select(1)
          //"Error durante la carga"
          return []
        }
      )
    })
  }

  openUploadModal(){
    console.log("open modal")
    let modal = this.modalController.create(ManualUploadComponent, {log_suffix:this.logSuffix})
    modal.present()
  }
}
