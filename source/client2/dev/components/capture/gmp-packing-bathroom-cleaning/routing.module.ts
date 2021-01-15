import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingBathroomCleaningCaptureComponent } from './capture/gmp-packing-bathroom-cleaning-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingBathroomCleaningCaptureComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingBathroomCleaningCaptureRoutingModule { }