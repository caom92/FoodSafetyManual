import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionInteriorAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-interior-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingPestControlInspectionInteriorAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionInteriorAuthorizationRoutingModule { }