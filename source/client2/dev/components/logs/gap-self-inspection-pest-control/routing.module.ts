import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPSelfInspectionPestControlAuthorizationComponent } from './authorization/gap.self.inspection.pest.control.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPSelfInspectionPestControlAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPSelfInspectionPestControlAuthorizationRoutingModule { }