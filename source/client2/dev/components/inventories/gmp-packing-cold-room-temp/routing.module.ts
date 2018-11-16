import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingColdRoomTempInventoryViewerComponent } from './viewer/gmp.packing.cold.room.temp.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingColdRoomTempInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingColdRoomTempInventoryRoutingModule { }