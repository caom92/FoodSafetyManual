import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestMachineCleaningCaptureComponent } from './capture/gap-packing-harvest-machine-cleaning-capture.component'

const routes: Routes = [
  { path: '', component: GAPPackingHarvestMachineCleaningCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestMachineCleaningCaptureRoutingModule { }