import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingPreopInventoryViewerComponent } from './viewer/gap.packing.preop.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GAPPackingPreopInventoryViewerComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingPreopInventoryRoutingModule { }