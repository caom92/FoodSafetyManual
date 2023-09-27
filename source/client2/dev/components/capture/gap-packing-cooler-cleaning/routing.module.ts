import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingCoolerCleaningCaptureComponent } from './capture/gap-packing-cooler-cleaning-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingCoolerCleaningCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingCoolerCleaningCaptureRoutingModule {}
