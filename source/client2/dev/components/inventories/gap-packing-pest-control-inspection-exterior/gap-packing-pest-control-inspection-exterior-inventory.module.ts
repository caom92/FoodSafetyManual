import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GAPPackingPestControlInspectionExteriorAddItemComponent } from './add-item/gap-packing-pest-control-inspection-exterior-add-item.component'
//-import { GAPPackingPestControlInspectionExteriorInventoryComponent } from './inventory/gap-packing-pest-control-inspection-exterior-inventory.component'
//-import { GAPPackingPestControlInspectionExteriorInventoryItemComponent } from './item/gap-packing-pest-control-inspection-exterior-inventory-item.component'
//-import { GAPPackingPestControlInspectionExteriorInventoryListComponent } from './list/gap-packing-pest-control-inspection-exterior-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-exterior-inventory-viewer.component'
import { GAPPackingPestControlInspectionExteriorInventoryRoutingModule } from './routing.module'
import { GAPPackingPestControlInspectionExteriorAreaInventoryService } from './area-inventory/services/gap-packing-pest-control-inspection-exterior-area-inventory.service'
import { GAPPackingPestControlInspectionExteriorAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-exterior-area-inventory.component'
import { GAPPackingPestControlInspectionExteriorAreaInventoryItemComponent } from './area-inventory/item/gap-packing-pest-control-inspection-exterior-area-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorAreaInventoryListComponent } from './area-inventory/list/gap-packing-pest-control-inspection-exterior-area-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorAreaInventoryAddItemComponent } from './area-inventory/add-item/gap-packing-pest-control-inspection-exterior-area-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryService } from './area-verification-inventory/services/gap-packing-pest-control-inspection-exterior-area-verification-inventory.service'
import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-exterior-area-verification-inventory.component'
import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gap-packing-pest-control-inspection-exterior-area-verification-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gap-packing-pest-control-inspection-exterior-area-verification-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gap-packing-pest-control-inspection-exterior-area-verification-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryService } from './corrective-action-inventory/services/gap-packing-pest-control-inspection-exterior-corrective-action-inventory.service'
import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-exterior-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gap-packing-pest-control-inspection-exterior-corrective-action-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gap-packing-pest-control-inspection-exterior-corrective-action-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gap-packing-pest-control-inspection-exterior-corrective-action-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryService } from './equipment-status-inventory/services/gap-packing-pest-control-inspection-exterior-equipment-status-inventory.service'
import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-exterior-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gap-packing-pest-control-inspection-exterior-equipment-status-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gap-packing-pest-control-inspection-exterior-equipment-status-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gap-packing-pest-control-inspection-exterior-equipment-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorPestTypeInventoryService } from './pest-type-inventory/services/gap-packing-pest-control-inspection-exterior-pest-type-inventory.service'
import { GAPPackingPestControlInspectionExteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-exterior-pest-type-inventory.component'
import { GAPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent } from './pest-type-inventory/item/gap-packing-pest-control-inspection-exterior-pest-type-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorPestTypeInventoryListComponent } from './pest-type-inventory/list/gap-packing-pest-control-inspection-exterior-pest-type-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gap-packing-pest-control-inspection-exterior-pest-type-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryService } from './protection-status-inventory/services/gap-packing-pest-control-inspection-exterior-protection-status-inventory.service'
import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-exterior-protection-status-inventory.component'
import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gap-packing-pest-control-inspection-exterior-protection-status-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gap-packing-pest-control-inspection-exterior-protection-status-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gap-packing-pest-control-inspection-exterior-protection-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionExteriorTaskInventoryService } from './task-inventory/services/gap-packing-pest-control-inspection-exterior-task-inventory.service'
import { GAPPackingPestControlInspectionExteriorTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-exterior-task-inventory.component'
import { GAPPackingPestControlInspectionExteriorTaskInventoryItemComponent } from './task-inventory/item/gap-packing-pest-control-inspection-exterior-task-inventory-item.component'
import { GAPPackingPestControlInspectionExteriorTaskInventoryListComponent } from './task-inventory/list/gap-packing-pest-control-inspection-exterior-task-inventory-list.component'
import { GAPPackingPestControlInspectionExteriorTaskInventoryAddItemComponent } from './task-inventory/add-item/gap-packing-pest-control-inspection-exterior-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingPestControlInspectionExteriorInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GAPPackingPestControlInspectionExteriorInventoryComponent,
    GAPPackingPestControlInspectionExteriorInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorInventoryListComponent,
    GAPPackingPestControlInspectionExteriorAddItemComponent,*/
    GAPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent,
    GAPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorAreaVerificationInventoryListComponent,
    GAPPackingPestControlInspectionExteriorAreaVerificationInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent,
    GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryListComponent,
    GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent,
    GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryListComponent,
    GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorPestTypeInventoryComponent,
    GAPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorPestTypeInventoryListComponent,
    GAPPackingPestControlInspectionExteriorPestTypeInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent,
    GAPPackingPestControlInspectionExteriorProtectionStatusInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorProtectionStatusInventoryListComponent,
    GAPPackingPestControlInspectionExteriorProtectionStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorTaskInventoryComponent,
    GAPPackingPestControlInspectionExteriorTaskInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorTaskInventoryListComponent,
    GAPPackingPestControlInspectionExteriorTaskInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorAreaInventoryComponent,
    GAPPackingPestControlInspectionExteriorAreaInventoryItemComponent,
    GAPPackingPestControlInspectionExteriorAreaInventoryListComponent,
    GAPPackingPestControlInspectionExteriorAreaInventoryAddItemComponent,
    GAPPackingPestControlInspectionExteriorInventoryViewerComponent
  ],
  providers: [
    GAPPackingPestControlInspectionExteriorAreaInventoryService,
    GAPPackingPestControlInspectionExteriorAreaVerificationInventoryService,
    GAPPackingPestControlInspectionExteriorCorrectiveActionInventoryService,
    GAPPackingPestControlInspectionExteriorEquipmentStatusInventoryService,
    GAPPackingPestControlInspectionExteriorPestTypeInventoryService,
    GAPPackingPestControlInspectionExteriorProtectionStatusInventoryService,
    GAPPackingPestControlInspectionExteriorTaskInventoryService,
  ]
})

export class GAPPackingPestControlInspectionExteriorInventoryModule { }