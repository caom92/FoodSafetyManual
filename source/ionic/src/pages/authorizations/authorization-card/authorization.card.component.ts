import { Component, Input } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'
import { AlertController, Events, NavController } from 'ionic-angular'
import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../../services/app.backend'
import { LoaderService } from '../../../services/app.loaders'
import { DateTimeService } from '../../../services/app.time'
import { ToastsService } from '../../../services/app.toasts'
import { AuthorizationLoader } from '../authorization-loader/authorization.loader.component'
import { WaitingLog } from './authorization.card.interface'

@Component({
  selector: 'authorization-card',
  templateUrl: './authorization.card.component.html'
})

export class AuthorizationCardComponent {
  @Language()
  lang: string

  @Input()
  log: WaitingLog = {
    captured_log_id: null,
    program_name: null,
    module_name: null,
    log_name: null,
    employee_id: null,
    employee_num: null,
    first_name: null,
    last_name: null,
    capture_date: null,
    service_name: null
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public ts: TService, public event: Events, private toastService: ToastsService, private server: BackendService, public timeService: DateTimeService, public loaderService: LoaderService) {
  }

  approveLog() {
    let confirm = this.alertCtrl.create({
      title: this.ts.translate("Titles.approve_log"),
      message: this.ts.translate("Messages.approve_log") + "<br><br>" + this.log.log_name + "<br>" + this.log.first_name + " " + this.log.last_name + "<br>" + this.log.capture_date,
      buttons: [
        {
          text: this.ts.translate("Options.cancel"),
          handler: () => {
            console.log('Cancelar')
          }
        },
        {
          text: this.ts.translate("Options.accept"),
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
  }

  rejectLog() {
    let confirm = this.alertCtrl.create({
      title: this.ts.translate("Titles.reject_log"),
      message: this.ts.translate("Messages.reject_log") + "<br><br>" + this.log.log_name + "<br>" + this.log.first_name + " " + this.log.last_name + "<br>" + this.log.capture_date,
      buttons: [
        {
          text: this.ts.translate("Options.cancel"),
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: this.ts.translate("Options.accept"),
          handler: () => {
            console.log('Rechazado');
            let data = new FormData()
            data.append("captured_log_id", "" + this.log.captured_log_id)
            this.server.update(
              'reject-log',
              data,
              (response: any) => {
                console.log("Bitacora aprobada")
                this.event.publish("log:rejected", this.log.captured_log_id)
                let confirmationAlert = this.alertCtrl.create({
                  title: 'Exito',
                  subTitle: 'La bitácora ha sido rechazada',
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
  }

  openLog() {
    let suffix = this.log.service_name
    if (suffix == "gmp-packing-hand-washing" ||
      suffix == "gmp-packing-preop" ||
      suffix == "gmp-packing-scale-calibration" ||
      suffix == "gmp-packing-thermo-calibration" ||
      suffix == "gmp-packing-cold-room-temp" ||
      suffix == "gmp-packing-glass-brittle" ||
      suffix == "gmp-packing-scissors-knives") {
      let reportID = this.log.captured_log_id
      let log_name = this.log.log_name
      this.navCtrl.push(AuthorizationLoader, {
        suffix: suffix,
        report_id: reportID,
        log_name: log_name
      })
    } else {
      this.toastService.showText("notAvailableInMobile")
    }
  }
}