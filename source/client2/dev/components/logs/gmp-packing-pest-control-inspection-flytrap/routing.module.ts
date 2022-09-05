import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionFlytrapAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-flytrap-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingPestControlInspectionFlytrapAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionFlytrapAuthorizationRoutingModule { }