import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPestControlInspectionExteriorCaptureComponent } from './capture/gmp-packing-pest-control-inspection-exterior-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingPestControlInspectionExteriorCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionExteriorCaptureRoutingModule { }