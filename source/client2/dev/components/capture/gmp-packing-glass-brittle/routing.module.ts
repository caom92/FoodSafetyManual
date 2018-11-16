import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingGlassBrittleCaptureComponent } from './capture/gmp-packing-glass-brittle-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingGlassBrittleCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingGlassBrittleCaptureRoutingModule { }