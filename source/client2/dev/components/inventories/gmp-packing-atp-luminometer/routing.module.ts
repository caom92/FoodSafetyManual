import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingATPLuminometerInventoryViewerComponent } from './viewer/gmp.packing.atp.luminometer.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingATPLuminometerInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingATPLuminometerInventoryRoutingModule { }