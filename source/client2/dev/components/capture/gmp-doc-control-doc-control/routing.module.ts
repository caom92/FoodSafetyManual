import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPDocControlDocControlCaptureComponent } from './capture/gmp-doc-control-doc-control-capture.component'

const routes: Routes = [
  { path: '', component: GMPDocControlDocControlCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPDocControlDocControlCaptureRoutingModule { }