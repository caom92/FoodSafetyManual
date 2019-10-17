import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestBlockInspectionInventoryViewerComponent } from './viewer/gap-packing-harvest-block-inspection-inventory-viewer.component'

const routes: Routes = [
  { path: '', component: GAPPackingHarvestBlockInspectionInventoryViewerComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestBlockInspectionInventoryRoutingModule { }