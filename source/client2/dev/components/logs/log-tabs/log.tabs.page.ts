import { Component, ComponentFactoryResolver, Type } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'

import { BackendService } from '../../../services/app.backend'
import { DynamicComponentResolver } from '../../dynamic.resolver'
import { GAPOthersUnusualOccurrenceLogComponent } from '../gap-others-unusual-occurrence/log/gap.others.unusual.occurrence.log'
import { GAPPackingPreopLogComponent } from '../gap-packing-preop/log/gap.packing.preop.log'
import { GMPDocControlDocControlLogComponent } from '../gmp-doc-control-doc-control/log/gmp.doc.control.doc.control.log'
import { GMPOthersUnusualOccurrenceLogComponent } from '../gmp-others-unusual-occurrence/log/gmp.others.unusual.occurrence.log'
import { GMPPackingAgedProductLogComponent } from '../gmp-packing-aged-product/log/gmp.packing.aged.product.log'
import { GMPPackingATPTestingLogComponent } from '../gmp-packing-atp-testing/log/gmp.packing.atp.testing.log'
import { GMPPackingColdRoomTempLogComponent } from '../gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'
import { GMPPackingFinishedProductLogComponent } from '../gmp-packing-finished-product/log/gmp.packing.finished.product.log'
import { GMPPackingGlassBrittleLogComponent } from '../gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingHandWashingLogComponent } from '../gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingOzoneWaterLogComponent } from '../gmp-packing-ozone-water/log/gmp.packing.ozone.water.log'
import { GMPPackingPreopLogComponent } from '../gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingScaleCalibrationLogComponent } from '../gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GMPPackingScissorsKnivesLogComponent } from '../gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { GMPPackingThermoCalibrationLogComponent } from '../gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPSelfInspectionPestControlLogComponent } from '../gmp-self-inspection-pest-control/log/gmp.self.inspection.pest.control.log'

@Component({
  selector: 'log-tabs-page',
  templateUrl: 'log.tabs.page.html'
})

export class LogTabsPage extends DynamicComponentResolver {
  @Language() lang: string
  log_name: string = "Loading..."
  suffix: string = ""
  loaderComponent: Type<any> = null
  manualDirectory: any = null
  isEmployee: boolean = false
  private readonly logComponents = {
    "gap-others-unusual-occurrence": GAPOthersUnusualOccurrenceLogComponent,
    "gap-packing-preop": GAPPackingPreopLogComponent,
    "gmp-doc-control-doc-control": GMPDocControlDocControlLogComponent,
    "gmp-others-unusual-occurrence": GMPOthersUnusualOccurrenceLogComponent,
    "gmp-packing-aged-product": GMPPackingAgedProductLogComponent,
    "gmp-packing-atp-testing": GMPPackingATPTestingLogComponent,
    "gmp-packing-cold-room-temp": GMPPackingColdRoomTempLogComponent,
    "gmp-packing-finished-product": GMPPackingFinishedProductLogComponent,
    "gmp-packing-glass-brittle": GMPPackingGlassBrittleLogComponent,
    "gmp-packing-hand-washing": GMPPackingHandWashingLogComponent,
    "gmp-packing-preop": GMPPackingPreopLogComponent,
    "gmp-packing-scale-calibration": GMPPackingScaleCalibrationLogComponent,
    "gmp-packing-scissors-knives": GMPPackingScissorsKnivesLogComponent,
    "gmp-packing-thermo-calibration": GMPPackingThermoCalibrationLogComponent,
    "gmp-self-inspection-pest-control": GMPSelfInspectionPestControlLogComponent,
    "gmp-packing-ozone-water": GMPPackingOzoneWaterLogComponent
  }


  constructor(factoryResolver: ComponentFactoryResolver, private router: StateService, private server: BackendService, private sanitizer: DomSanitizer) {
    super(factoryResolver)
  }

  ngOnInit() {
    this.suffix = this.router.params.suffix
    this.isEmployee = localStorage.role_name == "Employee"

    if (this.isEmployee) {
      if (this.logComponents[this.suffix] != undefined && this.logComponents[this.suffix] != null) {
        this.loaderComponent = this.loadComponent(this.logComponents[this.suffix], {
          
        }).instance
      }
    }

    let logManualFormData = new FormData
    logManualFormData.append("log-suffix", this.suffix)

    this.server.update(
      'get-log-manual-url',
      logManualFormData,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.log_name = response.data.log_name
            this.manualDirectory = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost/espresso/" + response.data.manual_location + "law/actual_manual.pdf")
          }
        } else {

        }
      }
    )
  }

  assignName() {
    this.log_name = this.router.params.suffix
  }
}