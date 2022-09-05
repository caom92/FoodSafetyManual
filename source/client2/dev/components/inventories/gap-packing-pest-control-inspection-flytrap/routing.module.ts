import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-flytrap-area-inventory.component'
import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.component'
import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.component'
import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-flytrap-protection-status-inventory.component'
import { GAPPackingPestControlInspectionFlytrapTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-flytrap-task-inventory.component'

import { GAPPackingPestControlInspectionFlytrapInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-flytrap-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GAPPackingPestControlInspectionFlytrapInventoryViewerComponent
  },
  {
    path: 'area',
    component: GAPPackingPestControlInspectionFlytrapAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GAPPackingPestControlInspectionFlytrapPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GAPPackingPestControlInspectionFlytrapTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingPestControlInspectionFlytrapInventoryRoutingModule { }