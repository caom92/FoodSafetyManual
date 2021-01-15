import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingBathroomCleaningCaptureComponent } from './capture/gap-packing-bathroom-cleaning-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingBathroomCleaningCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingBathroomCleaningCaptureRoutingModule { }