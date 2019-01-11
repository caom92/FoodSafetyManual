import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingATPTestingAuthorizationComponent } from './authorization/gmp.packing.atp.testing.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingATPTestingAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingATPTestingAuthorizationRoutingModule { }