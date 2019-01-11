import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPreopAuthorizationComponent } from './authorization/gmp.packing.preop.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingPreopAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingPreopAuthorizationRoutingModule { }