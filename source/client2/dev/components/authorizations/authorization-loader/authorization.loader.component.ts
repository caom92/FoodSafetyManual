import { Component, ComponentFactoryResolver, Input, OnInit, Type } from '@angular/core'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'

import { LogService } from '../../../services/app.logs'
import { DynamicComponentResolver } from '../../dynamic.resolver'
import { GAPOthersUnusualOccurrenceAuthorizationComponent } from '../../logs/gap-others-unusual-occurrence/authorization/gap.others.unusual.occurrence.authorization'
import { GAPPackingPreopAuthorizationComponent } from '../../logs/gap-packing-preop/authorization/gap.packing.preop.authorization'
import { GMPDocControlDocControlAuthorizationComponent } from '../../logs/gmp-doc-control-doc-control/authorization/gmp.doc.control.doc.control.authorization'
import { GMPOthersUnusualOccurrenceAuthorizationComponent } from '../../logs/gmp-others-unusual-occurrence/authorization/gmp.others.unusual.occurrence.authorization'
import { GMPPackingAgedProductAuthorizationComponent } from '../../logs/gmp-packing-aged-product/authorization/gmp.packing.aged.product.authorization'
import { GMPPackingATPTestingAuthorizationComponent } from '../../logs/gmp-packing-atp-testing/authorization/gmp.packing.atp.testing.authorization'
import { GMPPackingColdRoomTempAuthorizationComponent } from '../../logs/gmp-packing-cold-room-temp/authorization/gmp.packing.cold.room.temp.authorization'
import { GMPPackingFinishedProductAuthorizationComponent } from '../../logs/gmp-packing-finished-product/authorization/gmp.packing.finished.product.authorization'
import { GMPPackingGlassBrittleAuthorizationComponent } from '../../logs/gmp-packing-glass-brittle/authorization/gmp.packing.glass.brittle.authorization'
import { GMPPackingHandWashingAuthorizationComponent } from '../../logs/gmp-packing-hand-washing/authorization/gmp.packing.hand.washing.authorization'
import { GMPPackingOzoneWaterAuthorizationComponent } from '../../logs/gmp-packing-ozone-water/authorization/gmp.packing.ozone.water.authorization'
import { GMPPackingPreopAuthorizationComponent } from '../../logs/gmp-packing-preop/authorization/gmp.packing.preop.authorization'
import { GMPPackingScaleCalibrationAuthorizationComponent } from '../../logs/gmp-packing-scale-calibration/authorization/gmp.packing.scale.calibration.authorization'
import { GMPPackingScissorsKnivesAuthorizationComponent } from '../../logs/gmp-packing-scissors-knives/authorization/gmp.packing.scissors.knives.authorization'
import { GMPPackingThermoCalibrationAuthorizationComponent } from '../../logs/gmp-packing-thermo-calibration/authorization/gmp.packing.thermo.calibration.authorization'
import { GMPSelfInspectionPestControlAuthorizationComponent } from '../../logs/gmp-self-inspection-pest-control/authorization/gmp.self.inspection.pest.control.authorization'

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
  private readonly authorizationComponents = {
    "gap-others-unusual-occurrence": GAPOthersUnusualOccurrenceAuthorizationComponent,
    "gap-packing-preop": GAPPackingPreopAuthorizationComponent,
    "gmp-doc-control-doc-control": GMPDocControlDocControlAuthorizationComponent,
    "gmp-others-unusual-occurrence": GMPOthersUnusualOccurrenceAuthorizationComponent,
    "gmp-packing-aged-product": GMPPackingAgedProductAuthorizationComponent,
    "gmp-packing-atp-testing": GMPPackingATPTestingAuthorizationComponent,
    "gmp-packing-cold-room-temp": GMPPackingColdRoomTempAuthorizationComponent,
    "gmp-packing-finished-product": GMPPackingFinishedProductAuthorizationComponent,
    "gmp-packing-glass-brittle": GMPPackingGlassBrittleAuthorizationComponent,
    "gmp-packing-hand-washing": GMPPackingHandWashingAuthorizationComponent,
    "gmp-packing-preop": GMPPackingPreopAuthorizationComponent,
    "gmp-packing-scale-calibration": GMPPackingScaleCalibrationAuthorizationComponent,
    "gmp-packing-scissors-knives": GMPPackingScissorsKnivesAuthorizationComponent,
    "gmp-packing-thermo-calibration": GMPPackingThermoCalibrationAuthorizationComponent,
    "gmp-self-inspection-pest-control": GMPSelfInspectionPestControlAuthorizationComponent,
    "gmp-packing-ozone-water": GMPPackingOzoneWaterAuthorizationComponent
  }

  constructor(factoryResolver: ComponentFactoryResolver, private logService: LogService, private router: StateService) {
    super(factoryResolver)
  }

  public ngOnInit(): void {
    this.suffix = this.router.params.suffix
    this.reportID = this.router.params.report_id

    this.logService.authorization(this.suffix, this.reportID).then(success => {
      this.log_name = success.log_name
      if (this.authorizationComponents[this.suffix] != undefined && this.authorizationComponents[this.suffix] != null) {
        this.loaderComponent = this.loadComponent(this.authorizationComponents[this.suffix], {
          log: success
        }).instance
      }
    })
  }
}