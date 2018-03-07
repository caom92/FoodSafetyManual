import { Component, Input, ComponentFactoryResolver, OnInit, Type } from '@angular/core'

import { Language } from 'angular-l10n'

import { LogService } from '../../../services/app.logs'

import { GMPPackingHandWashingAuthorizationComponent } from '../../logs/gmp-packing-hand-washing/authorization/gmp.packing.hand.washing.authorization'
import { GMPPackingPreopAuthorizationComponent } from '../../logs/gmp-packing-preop/authorization/gmp.packing.preop.authorization'
import { GMPPackingScaleCalibrationAuthorizationComponent } from '../../logs/gmp-packing-scale-calibration/authorization/gmp.packing.scale.calibration.authorization'
import { GMPPackingThermoCalibrationAuthorizationComponent } from '../../logs/gmp-packing-thermo-calibration/authorization/gmp.packing.thermo.calibration.authorization'
import { GMPPackingColdRoomTempAuthorizationComponent } from '../../logs/gmp-packing-cold-room-temp/authorization/gmp.packing.cold.room.temp.authorization'
import { GMPPackingGlassBrittleAuthorizationComponent } from '../../logs/gmp-packing-glass-brittle/authorization/gmp.packing.glass.brittle.authorization'
import { GMPPackingScissorsKnivesAuthorizationComponent } from '../../logs/gmp-packing-scissors-knives/authorization/gmp.packing.scissors.knives.authorization'
import { TranslationService } from '../../../services/app.translation'
import { BackendService } from '../../../services/app.backend'
import { DynamicComponentResolver } from '../../dynamic.resolver'

import { GMPPackingHandWashingLogComponent } from '../../logs/gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingPreopLogComponent } from '../../logs/gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingScaleCalibrationLogComponent } from '../../logs/gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GMPPackingThermoCalibrationLogComponent } from '../../logs/gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPPackingColdRoomTempLogComponent } from '../../logs/gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'
import { GMPPackingGlassBrittleLogComponent } from '../../logs/gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingScissorsKnivesLogComponent } from '../../logs/gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { StateService } from '@uirouter/angular'
import { GAPOthersUnusualOccurrenceAuthorizationComponent } from '../../logs/gap-others-unusual-occurrence/authorization/gap.others.unusual.occurrence.authorization'
import { GMPOthersUnusualOccurrenceAuthorizationComponent } from '../../logs/gmp-others-unusual-occurrence/authorization/gmp.others.unusual.occurrence.authorization'
import { GAPPackingPreopAuthorizationComponent } from '../../logs/gap-packing-preop/authorization/gap.packing.preop.authorization'
import { GMPSelfInspectionPestControlAuthorizationComponent } from '../../logs/gmp-self-inspection-pest-control/authorization/gmp.self.inspection.pest.control.authorization'
import { GMPDocControlDocControlAuthorizationComponent } from '../../logs/gmp-doc-control-doc-control/authorization/gmp.doc.control.doc.control.authorization'
import { GMPPackingAgedProductAuthorizationComponent } from '../../logs/gmp-packing-aged-product/authorization/gmp.packing.aged.product.authorization'
import { GMPPackingFinishedProductAuthorizationComponent } from '../../logs/gmp-packing-finished-product/authorization/gmp.packing.finished.product.authorization'
import { GMPPackingATPTestingAuthorizationComponent } from '../../logs/gmp-packing-atp-testing/authorization/gmp.packing.atp.testing.authorization';

@Component({
  selector: 'authorization-loader',
  templateUrl: './authorization.loader.component.html',
})

export class AuthorizationLoader extends DynamicComponentResolver implements OnInit {
  @Language() lang: string
  @Input() suffix: string
  @Input() reportID: number
  @Input() log_name: string = "Loading..."
  loaderComponent: Type<any> = null

  constructor(
    factoryResolver: ComponentFactoryResolver,
    private logService: LogService,
    private router: StateService
  ) {
    super(factoryResolver)
  }

  public ngOnInit(): void {
    this.suffix = this.router.params.suffix
    this.reportID = this.router.params.report_id
    if (this.suffix == "gmp-packing-hand-washing" ||
      this.suffix == "gmp-packing-preop" ||
      this.suffix == "gmp-packing-scale-calibration" ||
      this.suffix == "gmp-packing-thermo-calibration" ||
      this.suffix == "gmp-packing-cold-room-temp" ||
      this.suffix == "gmp-packing-glass-brittle" ||
      this.suffix == "gmp-packing-scissors-knives" ||
      this.suffix == "gap-others-unusual-occurrence" ||
      this.suffix == "gmp-others-unusual-occurrence" ||
      this.suffix == "gmp-packing-aged-product" ||
      this.suffix == "gmp-packing-finished-product" ||
      this.suffix == "gap-packing-preop" ||
      this.suffix == "gmp-doc-control-doc-control" ||
      this.suffix == "gmp-packing-atp-testing" ||
      this.suffix == "gmp-self-inspection-pest-control") {
      this.logService.authorization(this.suffix, this.reportID).then(success => {
        this.log_name = success.log_name
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
          case 'gap-others-unusual-occurrence': this.loaderComponent = this.loadComponent(GAPOthersUnusualOccurrenceAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-others-unusual-occurrence': this.loaderComponent = this.loadComponent(GMPOthersUnusualOccurrenceAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gap-packing-preop': this.loaderComponent = this.loadComponent(GAPPackingPreopAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-self-inspection-pest-control': this.loaderComponent = this.loadComponent(GMPSelfInspectionPestControlAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-doc-control-doc-control': this.loaderComponent = this.loadComponent(GMPDocControlDocControlAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-aged-product': this.loaderComponent = this.loadComponent(GMPPackingAgedProductAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-finished-product': this.loaderComponent = this.loadComponent(GMPPackingFinishedProductAuthorizationComponent, {
            log: success
          }).instance
            break
          case 'gmp-packing-atp-testing': this.loaderComponent = this.loadComponent(GMPPackingATPTestingAuthorizationComponent, {
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