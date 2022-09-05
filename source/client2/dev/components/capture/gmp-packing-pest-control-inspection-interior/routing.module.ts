import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionInteriorCaptureComponent } from './capture/gmp-packing-pest-control-inspection-interior-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingPestControlInspectionInteriorCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionInteriorCaptureRoutingModule { }