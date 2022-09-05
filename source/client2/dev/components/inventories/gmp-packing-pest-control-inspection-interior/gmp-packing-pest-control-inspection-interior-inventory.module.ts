import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GMPPackingPestControlInspectionInteriorAddItemComponent } from './add-item/gmp-packing-pest-control-inspection-interior-add-item.component'
//-import { GMPPackingPestControlInspectionInteriorInventoryComponent } from './inventory/gmp-packing-pest-control-inspection-interior-inventory.component'
//-import { GMPPackingPestControlInspectionInteriorInventoryItemComponent } from './item/gmp-packing-pest-control-inspection-interior-inventory-item.component'
//-import { GMPPackingPestControlInspectionInteriorInventoryListComponent } from './list/gmp-packing-pest-control-inspection-interior-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-interior-inventory-viewer.component'
import { GMPPackingPestControlInspectionInteriorInventoryRoutingModule } from './routing.module'
import { GMPPackingPestControlInspectionInteriorAreaInventoryService } from './area-inventory/services/gmp-packing-pest-control-inspection-interior-area-inventory.service'
import { GMPPackingPestControlInspectionInteriorAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-interior-area-inventory.component'
import { GMPPackingPestControlInspectionInteriorAreaInventoryItemComponent } from './area-inventory/item/gmp-packing-pest-control-inspection-interior-area-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorAreaInventoryListComponent } from './area-inventory/list/gmp-packing-pest-control-inspection-interior-area-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorAreaInventoryAddItemComponent } from './area-inventory/add-item/gmp-packing-pest-control-inspection-interior-area-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryService } from './area-verification-inventory/services/gmp-packing-pest-control-inspection-interior-area-verification-inventory.service'
import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-interior-area-verification-inventory.component'
import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gmp-packing-pest-control-inspection-interior-area-verification-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gmp-packing-pest-control-inspection-interior-area-verification-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gmp-packing-pest-control-inspection-interior-area-verification-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryService } from './corrective-action-inventory/services/gmp-packing-pest-control-inspection-interior-corrective-action-inventory.service'
import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-interior-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gmp-packing-pest-control-inspection-interior-corrective-action-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gmp-packing-pest-control-inspection-interior-corrective-action-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gmp-packing-pest-control-inspection-interior-corrective-action-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from './equipment-status-inventory/services/gmp-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-interior-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gmp-packing-pest-control-inspection-interior-equipment-status-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gmp-packing-pest-control-inspection-interior-equipment-status-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gmp-packing-pest-control-inspection-interior-equipment-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorPestTypeInventoryService } from './pest-type-inventory/services/gmp-packing-pest-control-inspection-interior-pest-type-inventory.service'
import { GMPPackingPestControlInspectionInteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-interior-pest-type-inventory.component'
import { GMPPackingPestControlInspectionInteriorPestTypeInventoryItemComponent } from './pest-type-inventory/item/gmp-packing-pest-control-inspection-interior-pest-type-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorPestTypeInventoryListComponent } from './pest-type-inventory/list/gmp-packing-pest-control-inspection-interior-pest-type-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gmp-packing-pest-control-inspection-interior-pest-type-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService } from './protection-status-inventory/services/gmp-packing-pest-control-inspection-interior-protection-status-inventory.service'
import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-interior-protection-status-inventory.component'
import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gmp-packing-pest-control-inspection-interior-protection-status-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gmp-packing-pest-control-inspection-interior-protection-status-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gmp-packing-pest-control-inspection-interior-protection-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionInteriorTaskInventoryService } from './task-inventory/services/gmp-packing-pest-control-inspection-interior-task-inventory.service'
import { GMPPackingPestControlInspectionInteriorTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-interior-task-inventory.component'
import { GMPPackingPestControlInspectionInteriorTaskInventoryItemComponent } from './task-inventory/item/gmp-packing-pest-control-inspection-interior-task-inventory-item.component'
import { GMPPackingPestControlInspectionInteriorTaskInventoryListComponent } from './task-inventory/list/gmp-packing-pest-control-inspection-interior-task-inventory-list.component'
import { GMPPackingPestControlInspectionInteriorTaskInventoryAddItemComponent } from './task-inventory/add-item/gmp-packing-pest-control-inspection-interior-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingPestControlInspectionInteriorInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GMPPackingPestControlInspectionInteriorInventoryComponent,
    GMPPackingPestControlInspectionInteriorInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorInventoryListComponent,
    GMPPackingPestControlInspectionInteriorAddItemComponent,*/
    GMPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent,
    GMPPackingPestControlInspectionInteriorAreaVerificationInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorAreaVerificationInventoryListComponent,
    GMPPackingPestControlInspectionInteriorAreaVerificationInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent,
    GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryListComponent,
    GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent,
    GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryListComponent,
    GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorPestTypeInventoryComponent,
    GMPPackingPestControlInspectionInteriorPestTypeInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorPestTypeInventoryListComponent,
    GMPPackingPestControlInspectionInteriorPestTypeInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent,
    GMPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorProtectionStatusInventoryListComponent,
    GMPPackingPestControlInspectionInteriorProtectionStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorTaskInventoryComponent,
    GMPPackingPestControlInspectionInteriorTaskInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorTaskInventoryListComponent,
    GMPPackingPestControlInspectionInteriorTaskInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorAreaInventoryComponent,
    GMPPackingPestControlInspectionInteriorAreaInventoryItemComponent,
    GMPPackingPestControlInspectionInteriorAreaInventoryListComponent,
    GMPPackingPestControlInspectionInteriorAreaInventoryAddItemComponent,
    GMPPackingPestControlInspectionInteriorInventoryViewerComponent
  ],
  providers: [
    GMPPackingPestControlInspectionInteriorAreaInventoryService,
    GMPPackingPestControlInspectionInteriorAreaVerificationInventoryService,
    GMPPackingPestControlInspectionInteriorCorrectiveActionInventoryService,
    GMPPackingPestControlInspectionInteriorEquipmentStatusInventoryService,
    GMPPackingPestControlInspectionInteriorPestTypeInventoryService,
    GMPPackingPestControlInspectionInteriorProtectionStatusInventoryService,
    GMPPackingPestControlInspectionInteriorTaskInventoryService,
  ]
})

export class GMPPackingPestControlInspectionInteriorInventoryModule { }