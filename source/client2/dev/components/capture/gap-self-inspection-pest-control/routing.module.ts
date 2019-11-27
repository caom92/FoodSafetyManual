import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPSelfInspectionPestControlCaptureComponent } from './capture/gap-self-inspection-pest-control-capture.component'

const routes: Routes = [
  { path: '', component: GAPSelfInspectionPestControlCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPSelfInspectionPestControlCaptureRoutingModule { }