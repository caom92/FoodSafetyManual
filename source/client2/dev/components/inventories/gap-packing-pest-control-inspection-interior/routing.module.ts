import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GAPPackingPestControlInspectionInteriorAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-interior-area-inventory.component'
import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-interior-area-verification-inventory.component'
import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-interior-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-interior-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionInteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-interior-pest-type-inventory.component'
import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-interior-protection-status-inventory.component'
import { GAPPackingPestControlInspectionInteriorTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-interior-task-inventory.component'

import { GAPPackingPestControlInspectionInteriorInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-interior-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GAPPackingPestControlInspectionInteriorInventoryViewerComponent
  },
  {
    path: 'area',
    component: GAPPackingPestControlInspectionInteriorAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GAPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GAPPackingPestControlInspectionInteriorPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GAPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GAPPackingPestControlInspectionInteriorTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionInteriorInventoryRoutingModule { }