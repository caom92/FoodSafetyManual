import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GMPPackingPestControlInspectionExteriorAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-exterior-area-inventory.component'
import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.component'
import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionExteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.component'
import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-exterior-protection-status-inventory.component'
import { GMPPackingPestControlInspectionExteriorTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-exterior-task-inventory.component'

import { GMPPackingPestControlInspectionExteriorInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-exterior-inventory-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: GMPPackingPestControlInspectionExteriorInventoryViewerComponent
  },
  {
    path: 'area',
    component: GMPPackingPestControlInspectionExteriorAreaInventoryComponent
  },
  {
    path: 'protection-status',
    component: GMPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent
  },
  {
    path: 'equipment-status',
    component: GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent
  },
  {
    path: 'pest-type',
    component: GMPPackingPestControlInspectionExteriorPestTypeInventoryComponent
  },
  {
    path: 'area-verification',
    component: GMPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent
  },
  {
    path: 'task',
    component: GMPPackingPestControlInspectionExteriorTaskInventoryComponent
  },
  {
    path: 'corrective-action',
    component: GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingPestControlInspectionExteriorInventoryRoutingModule { }