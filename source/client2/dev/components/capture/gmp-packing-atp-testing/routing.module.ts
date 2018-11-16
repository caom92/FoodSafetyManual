import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingATPTestingCaptureComponent } from './capture/gmp-packing-atp-testing-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingATPTestingCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingATPTestingCaptureRoutingModule { }