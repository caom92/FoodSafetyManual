import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingMasterSanitationAreaInventoryComponent } from './area-inventory/inventory/gap-packing-master-sanitation-area-inventory.component'
import { GAPPackingMasterSanitationCheckInventoryComponent } from './check-inventory/inventory/gap-packing-master-sanitation-check-inventory.component'
import { GAPPackingMasterSanitationCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-master-sanitation-corrective-action-inventory.component'
import { GAPPackingMasterSanitationTypeInventoryComponent } from './type-inventory/inventory/gap-packing-master-sanitation-type-inventory.component'
import { GAPPackingMasterSanitationInventoryViewerComponent } from './viewer/gap-packing-master-sanitation-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GAPPackingMasterSanitationInventoryViewerComponent
  },
  {
    path: 'area',
    component: GAPPackingMasterSanitationAreaInventoryComponent
  },
  {
    path: 'type',
    component: GAPPackingMasterSanitationTypeInventoryComponent
  },
  {
    path: 'check',
    component: GAPPackingMasterSanitationCheckInventoryComponent
  }/*,
  {
    path: 'corrective-action',
    component: GAPPackingMasterSanitationCorrectiveActionInventoryComponent
  }*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingMasterSanitationInventoryRoutingModule { }