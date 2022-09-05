import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPestControlInspectionInteriorAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-interior-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingPestControlInspectionInteriorAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionInteriorAuthorizationRoutingModule { }