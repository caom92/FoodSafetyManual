import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPreopAuthorizationComponent } from './authorization/gap.packing.preop.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingPreopAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingPreopAuthorizationRoutingModule { }