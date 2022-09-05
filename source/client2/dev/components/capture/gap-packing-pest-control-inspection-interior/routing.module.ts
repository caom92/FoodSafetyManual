import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPestControlInspectionInteriorCaptureComponent } from './capture/gap-packing-pest-control-inspection-interior-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingPestControlInspectionInteriorCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionInteriorCaptureRoutingModule { }