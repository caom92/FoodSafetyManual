import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GAPPackingPestControlInspectionExteriorAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-exterior-area-inventory.component'
import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-exterior-area-verification-inventory.component'
import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-exterior-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-exterior-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionExteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-exterior-pest-type-inventory.component'
import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-exterior-protection-status-inventory.component'
import { GAPPackingPestControlInspectionExteriorTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-exterior-task-inventory.component'

import { GAPPackingPestControlInspectionExteriorInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-exterior-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GAPPackingPestControlInspectionExteriorInventoryViewerComponent
  },
  {
    path: 'area',
    component: GAPPackingPestControlInspectionExteriorAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GAPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GAPPackingPestControlInspectionExteriorPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GAPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GAPPackingPestControlInspectionExteriorTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionExteriorInventoryRoutingModule { }