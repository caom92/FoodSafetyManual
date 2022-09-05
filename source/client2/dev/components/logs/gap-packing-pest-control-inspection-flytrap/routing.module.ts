import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPestControlInspectionFlytrapAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-flytrap-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingPestControlInspectionFlytrapAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionFlytrapAuthorizationRoutingModule { }