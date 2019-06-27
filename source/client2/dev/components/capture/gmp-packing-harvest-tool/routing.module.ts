import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHarvestToolCaptureComponent } from './capture/gmp-packing-harvest-tool-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingHarvestToolCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingHarvestToolCaptureRoutingModule { }