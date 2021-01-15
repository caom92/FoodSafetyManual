import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingBathroomCleaningInventoryViewerComponent } from './viewer/gap-packing-bathroom-cleaning-inventory-viewer.component'

const routes: Routes = [
  { path: '', component: GAPPackingBathroomCleaningInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingBathroomCleaningInventoryRoutingModule { }  