import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHandWashingCaptureComponent } from './capture/gmp-packing-hand-washing-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingHandWashingCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingHandWashingCaptureRoutingModule { }