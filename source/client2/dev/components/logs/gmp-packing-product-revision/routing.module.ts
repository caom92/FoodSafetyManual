import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingProductRevisionAuthorizationComponent } from './authorization/gmp-packing-product-revision-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingProductRevisionAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingProductRevisionAuthorizationRoutingModule { }