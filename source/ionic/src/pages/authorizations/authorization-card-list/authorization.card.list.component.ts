import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { NavController, AlertController, Select, Events } from 'ionic-angular'

import { Storage } from '@ionic/storage'

import { Language, TranslationService as TService } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { WaitingLog } from '../authorization-card/authorization.card.interface'

import { DateTimeService } from '../../../services/app.time'
import { BackendService } from '../../../services/app.backend'
import { TranslationService } from '../../../services/app.translation'
import { ToastService } from '../../../services/app.toasts'
import { LoaderService } from '../../../services/app.loaders'

@Component({
  selector: 'authorization-card-list-component',
  templateUrl: './authorization.card.list.component.html',
  providers: [
    DateTimeService,
    BackendService,
    TranslationService,
    ToastService,
    LoaderService
  ]
})

export class AuthorizationCardListComponent implements OnInit {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string

  @Input()
  logs: Array<WaitingLog> = []

  constructor(public navCtrl: NavController, public server: BackendService, private translationService: TranslationService, public events: Events, public loaderService: LoaderService, public ts: TService, private toastService: ToastService) {
  }

  ngOnInit(){
    // Al incializar el componente, cargamos la lista de bitácoras pendientes de aprobación
    // para el usuario conectado
    let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
    loader.present()
    this.server.update(
      'list-unapproved-logs-of-user',
      new FormData(), 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.logs = response.data.waiting.logs
            loader.dismiss()
          }
        } else {
          loader.dismiss()
          this.navCtrl.pop()
        }
      },
      (error: any, caught: Observable<void>) => {
        loader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.navCtrl.pop()
        return []
      }
    )

    // Escuchamos el evento que nos indica si una bitácora fue aprobada/rechazada
    this.events.subscribe("log:approved", (logID) => {
      for(let log of this.logs){
        if(log.captured_log_id == logID){
          let index = this.logs.indexOf(log, 0)
          if (index > -1) {
             this.logs.splice(index, 1)
          }
        }
      }
    })

    this.events.subscribe("log:rejected", (logID) => {
      for(let log of this.logs){
        if(log.captured_log_id == logID){
          let index = this.logs.indexOf(log, 0)
          if (index > -1) {
             this.logs.splice(index, 1)
          }
        }
      }
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