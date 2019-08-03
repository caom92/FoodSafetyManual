import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestToolInventoryViewerComponent } from './viewer/gap-packing-harvest-tool-inventory-viewer.component'

const routes: Routes = [
  { path: '', component: GAPPackingHarvestToolInventoryViewerComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestToolInventoryRoutingModule { }  