import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingOzoneWaterInventoryViewerComponent } from './viewer/gmp.packing.ozone.water.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingOzoneWaterInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingOzoneWaterInventoryRoutingModule { }