import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GAPPackingPestControlInspectionFlytrapAddItemComponent } from './add-item/gap-packing-pest-control-inspection-flytrap-add-item.component'
//-import { GAPPackingPestControlInspectionFlytrapInventoryComponent } from './inventory/gap-packing-pest-control-inspection-flytrap-inventory.component'
//-import { GAPPackingPestControlInspectionFlytrapInventoryItemComponent } from './item/gap-packing-pest-control-inspection-flytrap-inventory-item.component'
//-import { GAPPackingPestControlInspectionFlytrapInventoryListComponent } from './list/gap-packing-pest-control-inspection-flytrap-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapInventoryViewerComponent } from './viewer/gap-packing-pest-control-inspection-flytrap-inventory-viewer.component'
import { GAPPackingPestControlInspectionFlytrapInventoryRoutingModule } from './routing.module'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryService } from './area-inventory/services/gap-packing-pest-control-inspection-flytrap-area-inventory.service'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryComponent } from './area-inventory/inventory/gap-packing-pest-control-inspection-flytrap-area-inventory.component'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryItemComponent } from './area-inventory/item/gap-packing-pest-control-inspection-flytrap-area-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryListComponent } from './area-inventory/list/gap-packing-pest-control-inspection-flytrap-area-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapAreaInventoryAddItemComponent } from './area-inventory/add-item/gap-packing-pest-control-inspection-flytrap-area-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService } from './area-verification-inventory/services/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.service'
import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gap-packing-pest-control-inspection-flytrap-area-verification-inventory.component'
import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gap-packing-pest-control-inspection-flytrap-area-verification-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gap-packing-pest-control-inspection-flytrap-area-verification-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gap-packing-pest-control-inspection-flytrap-area-verification-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from './corrective-action-inventory/services/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory.component'
import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gap-packing-pest-control-inspection-flytrap-corrective-action-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService } from './equipment-status-inventory/services/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory.service'
import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory.component'
import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gap-packing-pest-control-inspection-flytrap-equipment-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryService } from './pest-type-inventory/services/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.service'
import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryComponent } from './pest-type-inventory/inventory/gap-packing-pest-control-inspection-flytrap-pest-type-inventory.component'
import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryItemComponent } from './pest-type-inventory/item/gap-packing-pest-control-inspection-flytrap-pest-type-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryListComponent } from './pest-type-inventory/list/gap-packing-pest-control-inspection-flytrap-pest-type-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gap-packing-pest-control-inspection-flytrap-pest-type-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryService } from './protection-status-inventory/services/gap-packing-pest-control-inspection-flytrap-protection-status-inventory.service'
import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gap-packing-pest-control-inspection-flytrap-protection-status-inventory.component'
import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gap-packing-pest-control-inspection-flytrap-protection-status-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gap-packing-pest-control-inspection-flytrap-protection-status-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gap-packing-pest-control-inspection-flytrap-protection-status-inventory-add-item.component'

import { GAPPackingPestControlInspectionFlytrapTaskInventoryService } from './task-inventory/services/gap-packing-pest-control-inspection-flytrap-task-inventory.service'
import { GAPPackingPestControlInspectionFlytrapTaskInventoryComponent } from './task-inventory/inventory/gap-packing-pest-control-inspection-flytrap-task-inventory.component'
import { GAPPackingPestControlInspectionFlytrapTaskInventoryItemComponent } from './task-inventory/item/gap-packing-pest-control-inspection-flytrap-task-inventory-item.component'
import { GAPPackingPestControlInspectionFlytrapTaskInventoryListComponent } from './task-inventory/list/gap-packing-pest-control-inspection-flytrap-task-inventory-list.component'
import { GAPPackingPestControlInspectionFlytrapTaskInventoryAddItemComponent } from './task-inventory/add-item/gap-packing-pest-control-inspection-flytrap-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingPestControlInspectionFlytrapInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GAPPackingPestControlInspectionFlytrapInventoryComponent,
    GAPPackingPestControlInspectionFlytrapInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapAddItemComponent,*/
    GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent,
    GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent,
    GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent,
    GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapPestTypeInventoryComponent,
    GAPPackingPestControlInspectionFlytrapPestTypeInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapPestTypeInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapPestTypeInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent,
    GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapTaskInventoryComponent,
    GAPPackingPestControlInspectionFlytrapTaskInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapTaskInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapTaskInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapAreaInventoryComponent,
    GAPPackingPestControlInspectionFlytrapAreaInventoryItemComponent,
    GAPPackingPestControlInspectionFlytrapAreaInventoryListComponent,
    GAPPackingPestControlInspectionFlytrapAreaInventoryAddItemComponent,
    GAPPackingPestControlInspectionFlytrapInventoryViewerComponent
  ],
  providers: [
    GAPPackingPestControlInspectionFlytrapAreaInventoryService,
    GAPPackingPestControlInspectionFlytrapAreaVerificationInventoryService,
    GAPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService,
    GAPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService,
    GAPPackingPestControlInspectionFlytrapPestTypeInventoryService,
    GAPPackingPestControlInspectionFlytrapProtectionStatusInventoryService,
    GAPPackingPestControlInspectionFlytrapTaskInventoryService,
  ]
})

export class GAPPackingPestControlInspectionFlytrapInventoryModule { }