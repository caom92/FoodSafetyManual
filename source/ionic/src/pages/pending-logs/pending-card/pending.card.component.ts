import { Component, Input } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, Events, NavController } from 'ionic-angular'

import { BackendService } from '../../../services/app.backend'
import { LoaderService } from '../../../services/app.loaders'
import { LogService } from '../../../services/app.logs'
import { DateTimeService } from '../../../services/app.time'
import { ToastsService } from '../../../services/app.toasts'
import { LogDetails } from '../../logs/log.interfaces'
import { PendingLog } from './pending.card.interface'

@Component({
  selector: 'pending-card',
  templateUrl: './pending.card.component.html'
})

export class PendingCardComponent {
  @Language()
  lang: string

  @Input()
  log: PendingLog = {
    service: '',
    log: {},
    zone_name: '',
    program_name: '',
    module_name: '',
    log_name: '',
  }

  @Input()
  index: number

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public ts: TService, public event: Events, private toastService: ToastsService, private server: BackendService, public timeService: DateTimeService, public loaderService: LoaderService, public logService: LogService) {
  }

  sendLog(){
    console.log("Send Log")
    let confirm = this.alertCtrl.create({
      title: this.ts.translate("Titles.resend_log"),
      message: this.ts.translate("Messages.resend_log") + "<br><br>" + this.log.log_name,
      buttons: [
        {
        text: this.ts.translate("Options.cancel"),
          handler: () => {
            console.log('Cancelar')
          }
        },
        {
          text:  this.ts.translate("Options.accept"),
          handler: () => {
            console.log('Aceptar')
            let details: LogDetails = {zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name}
            console.log(this.log)
            console.log(this.index)
            this.logService.processPendingLog(this.index)
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  approveLog(){
    let confirm = this.alertCtrl.create({
      title: this.ts.translate("Titles.approve_log"),
      message: this.ts.translate("Messages.approve_log") + "<br><br>" + this.log.log_name + "<br>" + this.log.first_name + " " + this.log.last_name + "<br>" + this.log.capture_date,
      buttons: [
        {
        text: this.ts.translate("Options.cancel"),
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text:  this.ts.translate("Options.accept"),
          handler: () => {
            let data = new FormData()
            data.append("captured_log_id", "" + this.log.captured_log_id)
            data.append("date", this.timeService.getISODate(new Date()))
            this.server.update(
              'approve-log',
              data,
              (response: any) => {
                console.log("Bitacora aprobada")
                this.event.publish("log:approved", this.log.captured_log_id)
                let confirmationAlert = this.alertCtrl.create({
                  title: 'Exito',
                  subTitle: 'La bitácora ha sido autorizada',
                  buttons: ['OK']
                })
                confirmationAlert.present();
              },
              (error: any, caught: Observable<void>) => {
                this.toastService.showText("serverUnreachable")
                return []
              }
            )
          }
        }
      ]
    });
    confirm.present();
  }*/
}