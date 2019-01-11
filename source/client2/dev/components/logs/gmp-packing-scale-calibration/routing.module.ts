import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScaleCalibrationAuthorizationComponent } from './authorization/gmp.packing.scale.calibration.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingScaleCalibrationAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingScaleCalibrationAuthorizationRoutingModule { }