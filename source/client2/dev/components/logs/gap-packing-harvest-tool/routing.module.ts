import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestToolAuthorizationComponent } from './authorization/gap-packing-harvest-tool-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingHarvestToolAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestToolAuthorizationRoutingModule { }