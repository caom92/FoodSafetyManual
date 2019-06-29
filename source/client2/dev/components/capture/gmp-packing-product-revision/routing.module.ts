import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingProductRevisionCaptureComponent } from './capture/gmp-packing-product-revision-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingProductRevisionCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingProductRevisionCaptureRoutingModule { }