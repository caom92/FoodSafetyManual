import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingMasterSanitationAreaInventoryAddItemComponent } from './area-inventory/add-item/gap-packing-master-sanitation-area-inventory-add-item.component'
import { GAPPackingMasterSanitationAreaInventoryComponent } from './area-inventory/inventory/gap-packing-master-sanitation-area-inventory.component'
import { GAPPackingMasterSanitationAreaInventoryItemComponent } from './area-inventory/item/gap-packing-master-sanitation-area-inventory-item.component'
import { GAPPackingMasterSanitationAreaInventoryListComponent } from './area-inventory/list/gap-packing-master-sanitation-area-inventory-list.component'
import { GAPPackingMasterSanitationAreaInventoryService } from './area-inventory/services/gap-packing-master-sanitation-area-inventory.service'
import { GAPPackingMasterSanitationCheckInventoryAddItemComponent } from './check-inventory/add-item/gap-packing-master-sanitation-check-inventory-add-item.component'
import { GAPPackingMasterSanitationCheckInventoryComponent } from './check-inventory/inventory/gap-packing-master-sanitation-check-inventory.component'
import { GAPPackingMasterSanitationCheckInventoryItemComponent } from './check-inventory/item/gap-packing-master-sanitation-check-inventory-item.component'
import { GAPPackingMasterSanitationCheckInventoryListComponent } from './check-inventory/list/gap-packing-master-sanitation-check-inventory-list.component'
import { GAPPackingMasterSanitationCheckInventoryService } from './check-inventory/services/gap-packing-master-sanitation-check-inventory.service'
import { GAPPackingMasterSanitationInventoryRoutingModule } from './routing.module'
import { GAPPackingMasterSanitationTypeInventoryAddItemComponent } from './type-inventory/add-item/gap-packing-master-sanitation-type-inventory-add-item.component'
import { GAPPackingMasterSanitationTypeInventoryComponent } from './type-inventory/inventory/gap-packing-master-sanitation-type-inventory.component'
import { GAPPackingMasterSanitationTypeInventoryItemComponent } from './type-inventory/item/gap-packing-master-sanitation-type-inventory-item.component'
import { GAPPackingMasterSanitationTypeInventoryListComponent } from './type-inventory/list/gap-packing-master-sanitation-type-inventory-list.component'
import { GAPPackingMasterSanitationTypeInventoryService } from './type-inventory/services/gap-packing-master-sanitation-type-inventory.service'
import { GAPPackingMasterSanitationCorrectiveActionInventoryAddItemComponent } from './corrective-action-inventory/add-item/gap-packing-master-sanitation-corrective-action-inventory-add-item.component'
import { GAPPackingMasterSanitationCorrectiveActionInventoryComponent } from './corrective-action-inventory/inventory/gap-packing-master-sanitation-corrective-action-inventory.component'
import { GAPPackingMasterSanitationCorrectiveActionInventoryItemComponent } from './corrective-action-inventory/item/gap-packing-master-sanitation-corrective-action-inventory-item.component'
import { GAPPackingMasterSanitationCorrectiveActionInventoryListComponent } from './corrective-action-inventory/list/gap-packing-master-sanitation-corrective-action-inventory-list.component'
import { GAPPackingMasterSanitationCorrectiveActionInventoryService } from './corrective-action-inventory/services/gap-packing-master-sanitation-corrective-action-inventory.service'
import { GAPPackingMasterSanitationInventoryViewerComponent } from './viewer/gap-packing-master-sanitation-inventory-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingMasterSanitationInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    /*GAPPackingMasterSanitationInventoryComponent,
    GAPPackingMasterSanitationInventoryItemComponent,
    GAPPackingMasterSanitationInventoryListComponent,
    GAPPackingMasterSanitationAddItemComponent,*/
    /*GAPPackingMasterSanitationAreaVerificationInventoryComponent,
    GAPPackingMasterSanitationAreaVerificationInventoryItemComponent,
    GAPPackingMasterSanitationAreaVerificationInventoryListComponent,
    GAPPackingMasterSanitationAreaVerificationInventoryAddItemComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryItemComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryListComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryAddItemComponent,
    GAPPackingMasterSanitationEquipmentStatusInventoryComponent,
    GAPPackingMasterSanitationEquipmentStatusInventoryItemComponent,
    GAPPackingMasterSanitationEquipmentStatusInventoryListComponent,
    GAPPackingMasterSanitationEquipmentStatusInventoryAddItemComponent,
    GAPPackingMasterSanitationPestTypeInventoryComponent,
    GAPPackingMasterSanitationPestTypeInventoryItemComponent,
    GAPPackingMasterSanitationPestTypeInventoryListComponent,
    GAPPackingMasterSanitationPestTypeInventoryAddItemComponent,
    GAPPackingMasterSanitationProtectionStatusInventoryComponent,
    GAPPackingMasterSanitationProtectionStatusInventoryItemComponent,
    GAPPackingMasterSanitationProtectionStatusInventoryListComponent,
    GAPPackingMasterSanitationProtectionStatusInventoryAddItemComponent,
    GAPPackingMasterSanitationTaskInventoryComponent,
    GAPPackingMasterSanitationTaskInventoryItemComponent,
    GAPPackingMasterSanitationTaskInventoryListComponent,
    GAPPackingMasterSanitationTaskInventoryAddItemComponent,*/
    GAPPackingMasterSanitationAreaInventoryComponent,
    GAPPackingMasterSanitationAreaInventoryItemComponent,
    GAPPackingMasterSanitationAreaInventoryListComponent,
    GAPPackingMasterSanitationAreaInventoryAddItemComponent,
    GAPPackingMasterSanitationCheckInventoryComponent,
    GAPPackingMasterSanitationCheckInventoryItemComponent,
    GAPPackingMasterSanitationCheckInventoryListComponent,
    GAPPackingMasterSanitationCheckInventoryAddItemComponent,
    GAPPackingMasterSanitationTypeInventoryComponent,
    GAPPackingMasterSanitationTypeInventoryItemComponent,
    GAPPackingMasterSanitationTypeInventoryListComponent,
    GAPPackingMasterSanitationTypeInventoryAddItemComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryItemComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryListComponent,
    GAPPackingMasterSanitationCorrectiveActionInventoryAddItemComponent,
    GAPPackingMasterSanitationInventoryViewerComponent
  ],
  providers: [
    GAPPackingMasterSanitationAreaInventoryService,
    GAPPackingMasterSanitationCheckInventoryService,
    GAPPackingMasterSanitationTypeInventoryService,
    GAPPackingMasterSanitationCorrectiveActionInventoryService
  ]
})

export class GAPPackingMasterSanitationInventoryModule { }