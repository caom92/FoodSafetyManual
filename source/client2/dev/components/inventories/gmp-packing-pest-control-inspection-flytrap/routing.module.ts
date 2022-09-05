import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-area-inventory.component'
import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory.component'
import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory.component'
import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory.component'
import { GMPPackingPestControlInspectionFlytrapTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-task-inventory.component'

import { GMPPackingPestControlInspectionFlytrapInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-flytrap-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GMPPackingPestControlInspectionFlytrapInventoryViewerComponent
  },
  {
    path: 'area',
    component: GMPPackingPestControlInspectionFlytrapAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GMPPackingPestControlInspectionFlytrapPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GMPPackingPestControlInspectionFlytrapTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionFlytrapInventoryRoutingModule { }