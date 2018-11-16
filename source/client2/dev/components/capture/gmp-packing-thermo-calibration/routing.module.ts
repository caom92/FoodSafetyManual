import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingThermoCalibrationCaptureComponent } from './capture/gmp-packing-thermo-calibration-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingThermoCalibrationCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingThermoCalibrationCaptureRoutingModule { }