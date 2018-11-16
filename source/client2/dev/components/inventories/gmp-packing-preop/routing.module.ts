import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingPreopInventoryViewerComponent } from './viewer/gmp.packing.preop.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingPreopInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPreopInventoryRoutingModule { }