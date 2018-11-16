import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingAgedProductCaptureComponent } from './capture/gmp-packing-aged-product-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingAgedProductCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingAgedProductCaptureRoutingModule { }