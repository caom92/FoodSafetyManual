import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPestControlInspectionExteriorCaptureComponent } from './capture/gap-packing-pest-control-inspection-exterior-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingPestControlInspectionExteriorCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionExteriorCaptureRoutingModule { }