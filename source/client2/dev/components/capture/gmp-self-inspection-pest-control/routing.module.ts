import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPSelfInspectionPestControlCaptureComponent } from './capture/gmp-self-inspection-pest-control-capture.component'

const routes: Routes = [
  { path: '', component: GMPSelfInspectionPestControlCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPSelfInspectionPestControlCaptureRoutingModule { }