import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHandWashingAuthorizationComponent } from './authorization/gmp.packing.hand.washing.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingHandWashingAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingHandWashingAuthorizationRoutingModule { }