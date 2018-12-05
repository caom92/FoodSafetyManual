import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingWaterResourceCaptureComponent } from './capture/gap-packing-water-resource-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingWaterResourceCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingWaterResourceCaptureRoutingModule { }