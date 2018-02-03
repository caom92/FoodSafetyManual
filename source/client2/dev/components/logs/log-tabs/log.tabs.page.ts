import { Component, ComponentFactoryResolver, Type } from '@angular/core'
import { StateService } from '@uirouter/angular'

import { Language } from 'angular-l10n'
import { DynamicComponentResolver } from '../../dynamic.resolver'

import { GMPPackingHandWashingLogComponent } from '../gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingPreopLogComponent } from '../gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingScaleCalibrationLogComponent } from '../gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GMPPackingThermoCalibrationLogComponent } from '../gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPPackingColdRoomTempLogComponent } from '../gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'
import { GMPPackingGlassBrittleLogComponent } from '../gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingScissorsKnivesLogComponent } from '../gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { BackendService } from '../../../services/app.backend'
import { DomSanitizer } from '@angular/platform-browser'

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

  constructor(factoryResolver: ComponentFactoryResolver, private router: StateService, private server: BackendService, private sanitizer: DomSanitizer) {
    super(factoryResolver)
  }

  ngOnInit() {
    //this.log_name = this.router.params.suffix
    //this.assignName()
    console.log("Log Tabs Page Init")
    this.suffix = this.router.params.suffix
    if (this.suffix == "gmp-packing-hand-washing" ||
      this.suffix == "gmp-packing-preop" ||
      this.suffix == "gmp-packing-scale-calibration" ||
      this.suffix == "gmp-packing-thermo-calibration" ||
      this.suffix == "gmp-packing-cold-room-temp" ||
      this.suffix == "gmp-packing-glass-brittle" ||
      this.suffix == "gmp-packing-scissors-knives") {
      switch (this.suffix) {
        case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GMPPackingPreopLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-thermo-calibration': this.loaderComponent = this.loadComponent(GMPPackingThermoCalibrationLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-cold-room-temp': this.loaderComponent = this.loadComponent(GMPPackingColdRoomTempLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-glass-brittle': this.loaderComponent = this.loadComponent(GMPPackingGlassBrittleLogComponent, {
          
        }).instance
          break
        case 'gmp-packing-scissors-knives': this.loaderComponent = this.loadComponent(GMPPackingScissorsKnivesLogComponent, {
          
        }).instance
          break
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
            console.log(this.manualDirectory)
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