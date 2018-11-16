import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingGlassBrittleInventoryViewerComponent } from './viewer/gmp.packing.glass.brittle.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingGlassBrittleInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingGlassBrittleInventoryRoutingModule { }