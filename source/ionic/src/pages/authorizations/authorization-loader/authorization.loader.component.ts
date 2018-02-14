import { Component, ComponentFactoryResolver, Input, OnInit, Type } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Language } from 'angular-l10n'
import { NavParams } from 'ionic-angular/navigation/nav-params'
import { Events } from 'ionic-angular/util/events'

import { BackendService } from '../../../services/app.backend'
import { LogService } from '../../../services/app.logs'
import { TranslationService } from '../../../services/app.translation'
import { GMPPackingColdRoomTempAuthorizationComponent } from '../../logs/gmp-packing-cold-room-temp/authorization/gmp.packing.cold.room.temp.authorization'
import { GMPPackingGlassBrittleAuthorizationComponent } from '../../logs/gmp-packing-glass-brittle/authorization/gmp.packing.glass.brittle.authorization'
import { GMPPackingHandWashingAuthorizationComponent } from '../../logs/gmp-packing-hand-washing/authorization/gmp.packing.hand.washing.authorization'
import { GMPPackingPreopAuthorizationComponent } from '../../logs/gmp-packing-preop/authorization/gmp.packing.preop.authorization'
import { GMPPackingScaleCalibrationAuthorizationComponent } from '../../logs/gmp-packing-scale-calibration/authorization/gmp.packing.scale.calibration.authorization'
import { GMPPackingScissorsKnivesAuthorizationComponent } from '../../logs/gmp-packing-scissors-knives/authorization/gmp.packing.scissors.knives.authorization'
import { GMPPackingThermoCalibrationAuthorizationComponent } from '../../logs/gmp-packing-thermo-calibration/authorization/gmp.packing.thermo.calibration.authorization'
import { DynamicNavbarPageComponent } from '../../super-components/dynamic.navbar.component'

@Component({
  selector: 'authorization-loader',
  templateUrl: './authorization.loader.component.html'
})

export class AuthorizationLoader extends DynamicNavbarPageComponent implements OnInit {
  @Language() lang: string
  @Input() suffix: string
  @Input() reportID: number
  @Input() log_name: string = "Default"
  loaderComponent: Type<any> = null

  constructor(translationService: TranslationService,
    events: Events,
    storage: Storage,
    server: BackendService,
    factoryResolver: ComponentFactoryResolver,
    private logService: LogService,
    private navParams: NavParams
    ) {
    super(translationService, events, storage, server, factoryResolver)
  }

  public ngOnInit(): void {
    console.log("Enter dynamic component")
    this.suffix = this.navParams.get("suffix")
    this.reportID = this.navParams.get("report_id")
    this.log_name = this.navParams.get("log_name")
    console.log(this.suffix)
    console.log(this.reportID)
    if (this.suffix == "gmp-packing-hand-washing" ||
      this.suffix == "gmp-packing-preop" ||
      this.suffix == "gmp-packing-scale-calibration" ||
      this.suffix == "gmp-packing-thermo-calibration" ||
      this.suffix == "gmp-packing-cold-room-temp" ||
      this.suffix == "gmp-packing-glass-brittle" ||
      this.suffix == "gmp-packing-scissors-knives") {
      this.logService.authorization(this.suffix, this.reportID).then(success => {
        switch (this.suffix) {
          case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GMPPackingPreopAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-thermo-calibration': this.loaderComponent = this.loadComponent(GMPPackingThermoCalibrationAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-cold-room-temp': this.loaderComponent = this.loadComponent(GMPPackingColdRoomTempAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-glass-brittle': this.loaderComponent = this.loadComponent(GMPPackingGlassBrittleAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-scissors-knives': this.loaderComponent = this.loadComponent(GMPPackingScissorsKnivesAuthorizationComponent, {
            log: success
          }).instance
            break
        }
      }, error => {

      })
    } else {
      console.log("Authorization not available in mobile")
      //this.toastService.showText("notAvailableInMobile")
    }
  }
}