import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingAgedProductAuthorizationComponent } from './authorization/gmp.packing.aged.product.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingAgedProductAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingAgedProductAuthorizationRoutingModule { }