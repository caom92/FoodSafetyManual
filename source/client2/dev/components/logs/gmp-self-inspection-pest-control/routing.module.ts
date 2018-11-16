import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPSelfInspectionPestControlAuthorizationComponent } from './authorization/gmp.self.inspection.pest.control.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPSelfInspectionPestControlAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPSelfInspectionPestControlAuthorizationRoutingModule { }