import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingATPLuminometerAuthorizationComponent } from './authorization/gmp.packing.atp.luminometer.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingATPLuminometerAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingATPLuminometerAuthorizationRoutingModule { }