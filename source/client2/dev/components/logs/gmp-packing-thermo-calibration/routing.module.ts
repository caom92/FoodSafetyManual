import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingThermoCalibrationAuthorizationComponent } from './authorization/gmp.packing.thermo.calibration.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingThermoCalibrationAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingThermoCalibrationAuthorizationRoutingModule { }