import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPreopCaptureComponent } from './capture/gap-packing-preop-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingPreopCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingPreopCaptureRoutingModule { }