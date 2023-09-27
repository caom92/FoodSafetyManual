import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingCoolerCleaningAreaInventoryComponent } from './area-inventory/inventory/gap-packing-cooler-cleaning-area-inventory.component'
import { GAPPackingCoolerCleaningCheckInventoryComponent } from './check-inventory/inventory/gap-packing-cooler-cleaning-check-inventory.component'
import { GAPPackingCoolerCleaningTypeInventoryComponent } from './type-inventory/inventory/gap-packing-cooler-cleaning-type-inventory.component'
import { GAPPackingCoolerCleaningInventoryViewerComponent } from './viewer/gap-packing-cooler-cleaning-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GAPPackingCoolerCleaningInventoryViewerComponent
  },
  {
    path: 'area',
    component: GAPPackingCoolerCleaningAreaInventoryComponent
  },
  {
    path: 'type',
    component: GAPPackingCoolerCleaningTypeInventoryComponent
  },
  {
    path: 'check',
    component: GAPPackingCoolerCleaningCheckInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingCoolerCleaningInventoryRoutingModule { }