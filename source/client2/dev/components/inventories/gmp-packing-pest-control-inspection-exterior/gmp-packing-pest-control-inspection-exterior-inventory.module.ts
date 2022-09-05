import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

//-import { GMPPackingPestControlInspectionExteriorAddItemComponent } from './add-item/gmp-packing-pest-control-inspection-exterior-add-item.component'
//-import { GMPPackingPestControlInspectionExteriorInventoryComponent } from './inventory/gmp-packing-pest-control-inspection-exterior-inventory.component'
//-import { GMPPackingPestControlInspectionExteriorInventoryItemComponent } from './item/gmp-packing-pest-control-inspection-exterior-inventory-item.component'
//-import { GMPPackingPestControlInspectionExteriorInventoryListComponent } from './list/gmp-packing-pest-control-inspection-exterior-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorInventoryViewerComponent } from './viewer/gmp-packing-pest-control-inspection-exterior-inventory-viewer.component'
import { GMPPackingPestControlInspectionExteriorInventoryRoutingModule } from './routing.module'
import { GMPPackingPestControlInspectionExteriorAreaInventoryService } from './area-inventory/services/gmp-packing-pest-control-inspection-exterior-area-inventory.service'
import { GMPPackingPestControlInspectionExteriorAreaInventoryComponent } from './area-inventory/inventory/gmp-packing-pest-control-inspection-exterior-area-inventory.component'
import { GMPPackingPestControlInspectionExteriorAreaInventoryItemComponent } from './area-inventory/item/gmp-packing-pest-control-inspection-exterior-area-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorAreaInventoryListComponent } from './area-inventory/list/gmp-packing-pest-control-inspection-exterior-area-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorAreaInventoryAddItemComponent } from './area-inventory/add-item/gmp-packing-pest-control-inspection-exterior-area-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService } from './area-verification-inventory/services/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.service'
import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent } from './area-verification-inventory/inventory/gmp-packing-pest-control-inspection-exterior-area-verification-inventory.component'
import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent } from './area-verification-inventory/item/gmp-packing-pest-control-inspection-exterior-area-verification-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryListComponent } from './area-verification-inventory/list/gmp-packing-pest-control-inspection-exterior-area-verification-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorAreaVerificationInventoryAddItemComponent } from './area-verification-inventory/add-item/gmp-packing-pest-control-inspection-exterior-area-verification-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryService } from './corrective-action-inventory/services/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory.service'
import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory.component'
import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gmp-packing-pest-control-inspection-exterior-corrective-action-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService } from './equipment-status-inventory/services/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.service'
import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent } from './equipment-status-inventory/inventory/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory.component'
import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent } from './equipment-status-inventory/item/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryListComponent } from './equipment-status-inventory/list/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryAddItemComponent } from './equipment-status-inventory/add-item/gmp-packing-pest-control-inspection-exterior-equipment-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorPestTypeInventoryService } from './pest-type-inventory/services/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.service'
import { GMPPackingPestControlInspectionExteriorPestTypeInventoryComponent } from './pest-type-inventory/inventory/gmp-packing-pest-control-inspection-exterior-pest-type-inventory.component'
import { GMPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent } from './pest-type-inventory/item/gmp-packing-pest-control-inspection-exterior-pest-type-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorPestTypeInventoryListComponent } from './pest-type-inventory/list/gmp-packing-pest-control-inspection-exterior-pest-type-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorPestTypeInventoryAddItemComponent } from './pest-type-inventory/add-item/gmp-packing-pest-control-inspection-exterior-pest-type-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryService } from './protection-status-inventory/services/gmp-packing-pest-control-inspection-exterior-protection-status-inventory.service'
import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent } from './protection-status-inventory/inventory/gmp-packing-pest-control-inspection-exterior-protection-status-inventory.component'
import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryItemComponent } from './protection-status-inventory/item/gmp-packing-pest-control-inspection-exterior-protection-status-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryListComponent } from './protection-status-inventory/list/gmp-packing-pest-control-inspection-exterior-protection-status-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorProtectionStatusInventoryAddItemComponent } from './protection-status-inventory/add-item/gmp-packing-pest-control-inspection-exterior-protection-status-inventory-add-item.component'

import { GMPPackingPestControlInspectionExteriorTaskInventoryService } from './task-inventory/services/gmp-packing-pest-control-inspection-exterior-task-inventory.service'
import { GMPPackingPestControlInspectionExteriorTaskInventoryComponent } from './task-inventory/inventory/gmp-packing-pest-control-inspection-exterior-task-inventory.component'
import { GMPPackingPestControlInspectionExteriorTaskInventoryItemComponent } from './task-inventory/item/gmp-packing-pest-control-inspection-exterior-task-inventory-item.component'
import { GMPPackingPestControlInspectionExteriorTaskInventoryListComponent } from './task-inventory/list/gmp-packing-pest-control-inspection-exterior-task-inventory-list.component'
import { GMPPackingPestControlInspectionExteriorTaskInventoryAddItemComponent } from './task-inventory/add-item/gmp-packing-pest-control-inspection-exterior-task-inventory-add-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingPestControlInspectionExteriorInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GMPPackingPestControlInspectionExteriorInventoryComponent,
    GMPPackingPestControlInspectionExteriorInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorInventoryListComponent,
    GMPPackingPestControlInspectionExteriorAddItemComponent,*/
    GMPPackingPestControlInspectionExteriorAreaVerificationInventoryComponent,
    GMPPackingPestControlInspectionExteriorAreaVerificationInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorAreaVerificationInventoryListComponent,
    GMPPackingPestControlInspectionExteriorAreaVerificationInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryComponent,
    GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryListComponent,
    GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryComponent,
    GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryListComponent,
    GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorPestTypeInventoryComponent,
    GMPPackingPestControlInspectionExteriorPestTypeInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorPestTypeInventoryListComponent,
    GMPPackingPestControlInspectionExteriorPestTypeInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorProtectionStatusInventoryComponent,
    GMPPackingPestControlInspectionExteriorProtectionStatusInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorProtectionStatusInventoryListComponent,
    GMPPackingPestControlInspectionExteriorProtectionStatusInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorTaskInventoryComponent,
    GMPPackingPestControlInspectionExteriorTaskInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorTaskInventoryListComponent,
    GMPPackingPestControlInspectionExteriorTaskInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorAreaInventoryComponent,
    GMPPackingPestControlInspectionExteriorAreaInventoryItemComponent,
    GMPPackingPestControlInspectionExteriorAreaInventoryListComponent,
    GMPPackingPestControlInspectionExteriorAreaInventoryAddItemComponent,
    GMPPackingPestControlInspectionExteriorInventoryViewerComponent
  ],
  providers: [
    GMPPackingPestControlInspectionExteriorAreaInventoryService,
    GMPPackingPestControlInspectionExteriorAreaVerificationInventoryService,
    GMPPackingPestControlInspectionExteriorCorrectiveActionInventoryService,
    GMPPackingPestControlInspectionExteriorEquipmentStatusInventoryService,
    GMPPackingPestControlInspectionExteriorPestTypeInventoryService,
    GMPPackingPestControlInspectionExteriorProtectionStatusInventoryService,
    GMPPackingPestControlInspectionExteriorTaskInventoryService,
  ]
})

export class GMPPackingPestControlInspectionExteriorInventoryModule { }