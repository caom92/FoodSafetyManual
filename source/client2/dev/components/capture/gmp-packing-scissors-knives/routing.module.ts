import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScissorsKnivesCaptureComponent } from './capture/gmp-packing-scissors-knives-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingScissorsKnivesCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingScissorsKnivesCaptureRoutingModule { }