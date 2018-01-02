import { Component, ViewChild, OnInit } from '@angular/core'
import { NavController, NavParams, Select, Events, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language, TranslationService as TService } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../../services/app.backend'
import { TranslationService } from '../../../services/app.translation'
import { ToastService } from '../../../services/app.toasts'
import { DateTimeService } from '../../../services/app.time'

import { ManualTab } from '../../manual/manual'
import { ReportTab } from '../../reports/reports'

import { NavbarPageComponent } from '../../super-components/navbar.component'

import { GMPPackingPreopLogComponent } from '../gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingHandWashingLogComponent } from '../gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingGlassBrittleLogComponent } from '../gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingScaleCalibrationLogComponent } from '../gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GAPPackingPreopLogComponent } from '../gap-packing-preop/log/gap.packing.preop.log'
import { GMPPackingScissorsKnivesLogComponent } from '../gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { GMPPackingThermoCalibrationLogComponent } from '../gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPPackingColdRoomTempLogComponent } from '../gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'

@Component({
  selector: 'log-tabs-page',
  templateUrl: 'log.tabs.page.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class LogTabsPage extends NavbarPageComponent implements OnInit {
  @Language() lang: string

  logTitle: string = ""
  log_suffix: string = ""
  isEmployeeFlag: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public translationService: TranslationService, public events: Events, public storage: Storage, public server: BackendService, public loadingCtrl: LoadingController, private toastService: ToastService, public ts: TService) {
    super(translationService, events, storage, server)
    this.log_suffix = this.navParams.get('log_suffix')
    this.logTitle = this.navParams.get('log_title')
    this.reportData.log_suffix = this.navParams.get('log_suffix')
  }

  logData: any = {}
  reportData: any = {}
  manualSource: any = {}

  tab1Root: any
  tab2Root: any
  tab3Root: any

  ngOnInit() {
    // Siempre se llama primero al ngOnInit del padre para suscribirse a la situación actual
    // de los pendientes
    super.ngOnInit()

    this.tab1Root = ManualTab
    this.tab2Root = ReportTab

    this.storage.get("role_name").then(
      role_name => {
        this.isEmployeeFlag = role_name == "Employee"
        switch (this.log_suffix) {
          case 'gmp-packing-preop': this.tab3Root = GMPPackingPreopLogComponent
            break
          case 'gmp-packing-hand-washing': this.tab3Root = GMPPackingHandWashingLogComponent
            break
          case 'gmp-packing-glass-brittle': this.tab3Root = GMPPackingGlassBrittleLogComponent
            break
          case 'gmp-packing-scale-calibration': this.tab3Root = GMPPackingScaleCalibrationLogComponent
            break
          case 'gap-packing-preop': this.tab3Root = GAPPackingPreopLogComponent
            break
          case 'gmp-packing-scissors-knives': this.tab3Root = GMPPackingScissorsKnivesLogComponent
            break
          case 'gmp-packing-thermo-calibration': this.tab3Root = GMPPackingThermoCalibrationLogComponent
            break
          case 'gmp-packing-cold-room-temp': this.tab3Root = GMPPackingColdRoomTempLogComponent
            break
          default: this.tab3Root = GMPPackingPreopLogComponent
        }
      },
      error => {

      }
    )

    this.storage.get("zone_name").then((zone_name) => {
      let manualFormData = new FormData()

      manualFormData.append("log-suffix", this.log_suffix)
      this.server.update(
        'get-log-manual-url',
        manualFormData,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              this.manualSource.manualSource = response.data.manual_location + zone_name.toLowerCase() + "/"
              this.manualSource.logSuffix = this.log_suffix
            }
          } else {

          }
        },
        (error: any, caught: Observable<void>) => {
          return []
        }
      )
    })
  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div text-center>
          <img class="spinner" src="assets/images/koi_spinner.png" alt="" width="240" height="240">
        </div>
        <div text-center>` + this.ts.translate("Connecting to Server") + `</div>`
    });

    loading.present();

    return loading
  }
}
