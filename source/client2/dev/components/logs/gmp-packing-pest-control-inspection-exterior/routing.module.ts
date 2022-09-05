import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionExteriorAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-exterior-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingPestControlInspectionExteriorAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionExteriorAuthorizationRoutingModule { }