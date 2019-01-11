import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingGlassBrittleAuthorizationComponent } from './authorization/gmp.packing.glass.brittle.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingGlassBrittleAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingGlassBrittleAuthorizationRoutingModule { }