import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingFinishedProductAuthorizationComponent } from './authorization/gmp.packing.finished.product.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingFinishedProductAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingFinishedProductAuthorizationRoutingModule { }