import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingWaterResourceInventoryViewerComponent } from './viewer/gap.packing.water.resource.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GAPPackingWaterResourceInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingWaterResourceInventoryRoutingModule { }