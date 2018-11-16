import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPreopCaptureComponent } from './capture/gmp-packing-preop-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingPreopCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingPreopCaptureRoutingModule { }