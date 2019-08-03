import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestToolCaptureComponent } from './capture/gap-packing-harvest-tool-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingHarvestToolCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestToolCaptureRoutingModule { }