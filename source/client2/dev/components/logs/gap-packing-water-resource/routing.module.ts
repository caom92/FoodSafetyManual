import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingWaterResourceAuthorizationComponent } from './authorization/gap.packing.water.resource.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingWaterResourceAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingWaterResourceAuthorizationRoutingModule { }