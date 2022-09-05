import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GAPPackingPestControlInspectionInteriorAddItemComponent } from './add-item/gap-packing-pest-control-inspection-interior-add-item.component'
//-import { GAPPackingPestControlInspectionInteriorInventoryComponent } from './inventory/gap-packing-pest-control-inspection-interior-inventory.component'
//-import { GAPPackingPestControlInspectionInteriorInventoryItemComponent } from './item/gap-packing-pest-control-inspection-interior-inventory-item.component'
//-import { GAPPackingPestControlInspectionInteriorInventoryListComponent } from './list/gap-packing-pest-control-inspection-interior-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-interior-inventory-viewer.component'
import { GAPPackingPestControlInspectionInteriorInventoryRoutingModule } from './routing.module'
import { GAPPackingPestControlInspectionInteriorAreaInventoryService } from './area-inventory/services/gap-packing-pest-control-inspection-interior-area-inventory.service'
import { GAPPackingPestControlInspectionInteriorAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-interior-area-inventory.component'
import { GAPPackingPestControlInspectionInteriorAreaInventoryItemComponent } from './area-inventory/item/gap-packing-pest-control-inspection-interior-area-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorAreaInventoryListComponent } from './area-inventory/list/gap-packing-pest-control-inspection-interior-area-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorAreaInventoryAddItemComponent } from './area-inventory/add-item/gap-packing-pest-control-inspection-interior-area-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService } from './area-verification-inventory/services/gap-packing-pest-control-inspection-interior-area-verification-inventory.service'
import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-interior-area-verification-inventory.component'
import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gap-packing-pest-control-inspection-interior-area-verification-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gap-packing-pest-control-inspection-interior-area-verification-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gap-packing-pest-control-inspection-interior-area-verification-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryService } from './corrective-action-inventory/services/gap-packing-pest-control-inspection-interior-corrective-action-inventory.service'
import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-interior-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gap-packing-pest-control-inspection-interior-corrective-action-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gap-packing-pest-control-inspection-interior-corrective-action-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gap-packing-pest-control-inspection-interior-corrective-action-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService } from './equipment-status-inventory/services/gap-packing-pest-control-inspection-interior-equipment-status-inventory.service'
import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-interior-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gap-packing-pest-control-inspection-interior-equipment-status-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gap-packing-pest-control-inspection-interior-equipment-status-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gap-packing-pest-control-inspection-interior-equipment-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorPestTypeInventoryService } from './pest-type-inventory/services/gap-packing-pest-control-inspection-interior-pest-type-inventory.service'
import { GAPPackingPestControlInspectionInteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-interior-pest-type-inventory.component'
import { GAPPackingPestControlInspectionInteriorPestTypeInventoryItemComponent } from './pest-type-inventory/item/gap-packing-pest-control-inspection-interior-pest-type-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorPestTypeInventoryListComponent } from './pest-type-inventory/list/gap-packing-pest-control-inspection-interior-pest-type-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gap-packing-pest-control-inspection-interior-pest-type-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryService } from './protection-status-inventory/services/gap-packing-pest-control-inspection-interior-protection-status-inventory.service'
import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-interior-protection-status-inventory.component'
import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gap-packing-pest-control-inspection-interior-protection-status-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gap-packing-pest-control-inspection-interior-protection-status-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gap-packing-pest-control-inspection-interior-protection-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionInteriorTaskInventoryService } from './task-inventory/services/gap-packing-pest-control-inspection-interior-task-inventory.service'
import { GAPPackingPestControlInspectionInteriorTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-interior-task-inventory.component'
import { GAPPackingPestControlInspectionInteriorTaskInventoryItemComponent } from './task-inventory/item/gap-packing-pest-control-inspection-interior-task-inventory-item.component'
import { GAPPackingPestControlInspectionInteriorTaskInventoryListComponent } from './task-inventory/list/gap-packing-pest-control-inspection-interior-task-inventory-list.component'
import { GAPPackingPestControlInspectionInteriorTaskInventoryAddItemComponent } from './task-inventory/add-item/gap-packing-pest-control-inspection-interior-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingPestControlInspectionInteriorInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GAPPackingPestControlInspectionInteriorInventoryComponent,
    GAPPackingPestControlInspectionInteriorInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorInventoryListComponent,
    GAPPackingPestControlInspectionInteriorAddItemComponent,*/
    GAPPackingPestControlInspectionInteriorAreaVerificationInventoryComponent,
    GAPPackingPestControlInspectionInteriorAreaVerificationInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorAreaVerificationInventoryListComponent,
    GAPPackingPestControlInspectionInteriorAreaVerificationInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryComponent,
    GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryListComponent,
    GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryComponent,
    GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryListComponent,
    GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorPestTypeInventoryComponent,
    GAPPackingPestControlInspectionInteriorPestTypeInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorPestTypeInventoryListComponent,
    GAPPackingPestControlInspectionInteriorPestTypeInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorProtectionStatusInventoryComponent,
    GAPPackingPestControlInspectionInteriorProtectionStatusInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorProtectionStatusInventoryListComponent,
    GAPPackingPestControlInspectionInteriorProtectionStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorTaskInventoryComponent,
    GAPPackingPestControlInspectionInteriorTaskInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorTaskInventoryListComponent,
    GAPPackingPestControlInspectionInteriorTaskInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorAreaInventoryComponent,
    GAPPackingPestControlInspectionInteriorAreaInventoryItemComponent,
    GAPPackingPestControlInspectionInteriorAreaInventoryListComponent,
    GAPPackingPestControlInspectionInteriorAreaInventoryAddItemComponent,
    GAPPackingPestControlInspectionInteriorInventoryViewerComponent
  ],
  providers: [
    GAPPackingPestControlInspectionInteriorAreaInventoryService,
    GAPPackingPestControlInspectionInteriorAreaVerificationInventoryService,
    GAPPackingPestControlInspectionInteriorCorrectiveActionInventoryService,
    GAPPackingPestControlInspectionInteriorEquipmentStatusInventoryService,
    GAPPackingPestControlInspectionInteriorPestTypeInventoryService,
    GAPPackingPestControlInspectionInteriorProtectionStatusInventoryService,
    GAPPackingPestControlInspectionInteriorTaskInventoryService,
  ]
})

export class GAPPackingPestControlInspectionInteriorInventoryModule { }