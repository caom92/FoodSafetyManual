import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionFlytrapCaptureComponent } from './capture/gmp-packing-pest-control-inspection-flytrap-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingPestControlInspectionFlytrapCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionFlytrapCaptureRoutingModule { }