import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPestControlInspectionExteriorAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-exterior-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingPestControlInspectionExteriorAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionExteriorAuthorizationRoutingModule { }