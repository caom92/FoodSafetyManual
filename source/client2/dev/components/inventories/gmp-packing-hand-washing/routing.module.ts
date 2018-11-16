import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingHandWashingInventoryViewerComponent } from './viewer/gmp.packing.hand.washing.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingHandWashingInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingHandWashingInventoryRoutingModule { }