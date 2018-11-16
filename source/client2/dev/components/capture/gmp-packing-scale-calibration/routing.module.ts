import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScaleCalibrationCaptureComponent } from './capture/gmp-packing-scale-calibration-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingScaleCalibrationCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingScaleCalibrationCaptureRoutingModule { }