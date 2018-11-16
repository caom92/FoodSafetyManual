import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingThermoCalibrationInventoryViewerComponent } from './viewer/gmp.packing.thermo.calibration.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingThermoCalibrationInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingThermoCalibrationInventoryRoutingModule { }