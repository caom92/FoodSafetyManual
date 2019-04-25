import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingATPLuminometerCaptureComponent } from './capture/gmp-packing-atp-luminometer-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingATPLuminometerCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingATPLuminometerCaptureRoutingModule { }