import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHarvestToolInventoryViewerComponent } from './viewer/gmp-packing-harvest-tool-inventory-viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingHarvestToolInventoryViewerComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingHarvestToolInventoryRoutingModule { }  