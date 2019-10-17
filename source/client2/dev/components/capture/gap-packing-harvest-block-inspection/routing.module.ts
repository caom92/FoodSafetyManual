import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestBlockInspectionCaptureComponent } from './capture/gap-packing-harvest-block-inspection-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingHarvestBlockInspectionCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestBlockInspectionCaptureRoutingModule { }