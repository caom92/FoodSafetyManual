import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestBlockInspectionAuthorizationComponent } from './authorization/gap-packing-harvest-block-inspection-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingHarvestBlockInspectionAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestBlockInspectionAuthorizationRoutingModule { }