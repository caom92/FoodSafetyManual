import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GMPPackingPestControlInspectionInteriorAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-interior-area-inventory.component'
import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-interior-area-verification-inventory.component'
import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-interior-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-interior-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionInteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-interior-pest-type-inventory.component'
import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-interior-protection-status-inventory.component'
import { GMPPackingPestControlInspectionInteriorTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-interior-task-inventory.component'

import { GMPPackingPestControlInspectionInteriorInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-interior-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GMPPackingPestControlInspectionInteriorInventoryViewerComponent
  },
  {
    path: 'area',
    component: GMPPackingPestControlInspectionInteriorAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GMPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GMPPackingPestControlInspectionInteriorPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GMPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GMPPackingPestControlInspectionInteriorTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionInteriorInventoryRoutingModule { }