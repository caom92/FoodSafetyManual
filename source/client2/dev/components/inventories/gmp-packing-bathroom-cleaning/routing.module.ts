import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingBathroomCleaningInventoryViewerComponent } from './viewer/gmp-packing-bathroom-cleaning-inventory-viewer.component'

const routes: Routes = [
  { path: '', component: GMPPackingBathroomCleaningInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingBathroomCleaningInventoryRoutingModule { }  