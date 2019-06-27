import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHarvestToolAuthorizationComponent } from './authorization/gmp-packing-harvest-tool-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingHarvestToolAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingHarvestToolAuthorizationRoutingModule { }