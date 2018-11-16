import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScissorsKnivesAuthorizationComponent } from './authorization/gmp.packing.scissors.knives.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingScissorsKnivesAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingScissorsKnivesAuthorizationRoutingModule { }