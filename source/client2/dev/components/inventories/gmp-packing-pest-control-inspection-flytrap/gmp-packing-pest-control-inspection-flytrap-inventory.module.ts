import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GMPPackingPestControlInspectionFlytrapAddItemComponent } from './add-item/gmp-packing-pest-control-inspection-flytrap-add-item.component'
//-import { GMPPackingPestControlInspectionFlytrapInventoryComponent } from './inventory/gmp-packing-pest-control-inspection-flytrap-inventory.component'
//-import { GMPPackingPestControlInspectionFlytrapInventoryItemComponent } from './item/gmp-packing-pest-control-inspection-flytrap-inventory-item.component'
//-import { GMPPackingPestControlInspectionFlytrapInventoryListComponent } from './list/gmp-packing-pest-control-inspection-flytrap-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-flytrap-inventory-viewer.component'
import { GMPPackingPestControlInspectionFlytrapInventoryRoutingModule } from './routing.module'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryService } from './area-inventory/services/gmp-packing-pest-control-inspection-flytrap-area-inventory.service'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-area-inventory.component'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryItemComponent } from './area-inventory/item/gmp-packing-pest-control-inspection-flytrap-area-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryListComponent } from './area-inventory/list/gmp-packing-pest-control-inspection-flytrap-area-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapAreaInventoryAddItemComponent } from './area-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-area-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryService } from './area-verification-inventory/services/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory.service'
import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory.component'
import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-area-verification-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService } from './corrective-action-inventory/services/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.service'
import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-corrective-action-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService } from './equipment-status-inventory/services/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.service'
import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-equipment-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryService } from './pest-type-inventory/services/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory.service'
import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory.component'
import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryItemComponent } from './pest-type-inventory/item/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryListComponent } from './pest-type-inventory/list/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-pest-type-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryService } from './protection-status-inventory/services/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory.service'
import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory.component'
import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-protection-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionFlytrapTaskInventoryService } from './task-inventory/services/gmp-packing-pest-control-inspection-flytrap-task-inventory.service'
import { GMPPackingPestControlInspectionFlytrapTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-flytrap-task-inventory.component'
import { GMPPackingPestControlInspectionFlytrapTaskInventoryItemComponent } from './task-inventory/item/gmp-packing-pest-control-inspection-flytrap-task-inventory-item.component'
import { GMPPackingPestControlInspectionFlytrapTaskInventoryListComponent } from './task-inventory/list/gmp-packing-pest-control-inspection-flytrap-task-inventory-list.component'
import { GMPPackingPestControlInspectionFlytrapTaskInventoryAddItemComponent } from './task-inventory/add-item/gmp-packing-pest-control-inspection-flytrap-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingPestControlInspectionFlytrapInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GMPPackingPestControlInspectionFlytrapInventoryComponent,
    GMPPackingPestControlInspectionFlytrapInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapAddItemComponent,*/
    GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryComponent,
    GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryComponent,
    GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryComponent,
    GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapPestTypeInventoryComponent,
    GMPPackingPestControlInspectionFlytrapPestTypeInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapPestTypeInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapPestTypeInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryComponent,
    GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapTaskInventoryComponent,
    GMPPackingPestControlInspectionFlytrapTaskInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapTaskInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapTaskInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapAreaInventoryComponent,
    GMPPackingPestControlInspectionFlytrapAreaInventoryItemComponent,
    GMPPackingPestControlInspectionFlytrapAreaInventoryListComponent,
    GMPPackingPestControlInspectionFlytrapAreaInventoryAddItemComponent,
    GMPPackingPestControlInspectionFlytrapInventoryViewerComponent
  ],
  providers: [
    GMPPackingPestControlInspectionFlytrapAreaInventoryService,
    GMPPackingPestControlInspectionFlytrapAreaVerificationInventoryService,
    GMPPackingPestControlInspectionFlytrapCorrectiveActionInventoryService,
    GMPPackingPestControlInspectionFlytrapEquipmentStatusInventoryService,
    GMPPackingPestControlInspectionFlytrapPestTypeInventoryService,
    GMPPackingPestControlInspectionFlytrapProtectionStatusInventoryService,
    GMPPackingPestControlInspectionFlytrapTaskInventoryService,
  ]
})

export class GMPPackingPestControlInspectionFlytrapInventoryModule { }