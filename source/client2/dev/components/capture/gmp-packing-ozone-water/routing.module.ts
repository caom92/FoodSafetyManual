import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingOzoneWaterCaptureComponent } from './capture/gmp-packing-ozone-water-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingOzoneWaterCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingOzoneWaterCaptureRoutingModule { }