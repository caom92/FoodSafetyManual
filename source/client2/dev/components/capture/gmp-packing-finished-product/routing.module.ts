import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingFinishedProductCaptureComponent } from './capture/gmp-packing-finished-product-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingFinishedProductCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingFinishedProductCaptureRoutingModule { }