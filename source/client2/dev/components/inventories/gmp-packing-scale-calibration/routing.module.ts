import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScaleCalibrationInventoryViewerComponent } from './viewer/gmp.packing.scale.calibration.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingScaleCalibrationInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingScaleCalibrationInventoryRoutingModule { }