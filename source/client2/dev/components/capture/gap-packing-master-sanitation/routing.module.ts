import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingMasterSanitationCaptureComponent } from './capture/gap-packing-master-sanitation-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingMasterSanitationCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingMasterSanitationCaptureRoutingModule {}
