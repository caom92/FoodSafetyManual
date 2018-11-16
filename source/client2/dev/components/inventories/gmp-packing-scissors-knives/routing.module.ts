import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingScissorsKnivesInventoryViewerComponent } from './viewer/gmp.packing.scissors.knives.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingScissorsKnivesInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingScissorsKnivesInventoryRoutingModule { }