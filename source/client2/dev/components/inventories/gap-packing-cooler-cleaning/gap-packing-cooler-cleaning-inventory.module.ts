import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingCoolerCleaningAreaInventoryAddItemComponent } from './area-inventory/add-item/gap-packing-cooler-cleaning-area-inventory-add-item.component'
import { GAPPackingCoolerCleaningAreaInventoryComponent } from './area-inventory/inventory/gap-packing-cooler-cleaning-area-inventory.component'
import { GAPPackingCoolerCleaningAreaInventoryItemComponent } from './area-inventory/item/gap-packing-cooler-cleaning-area-inventory-item.component'
import { GAPPackingCoolerCleaningAreaInventoryListComponent } from './area-inventory/list/gap-packing-cooler-cleaning-area-inventory-list.component'
import { GAPPackingCoolerCleaningAreaInventoryService } from './area-inventory/services/gap-packing-cooler-cleaning-area-inventory.service'
import { GAPPackingCoolerCleaningCheckInventoryAddItemComponent } from './check-inventory/add-item/gap-packing-cooler-cleaning-check-inventory-add-item.component'
import { GAPPackingCoolerCleaningCheckInventoryComponent } from './check-inventory/inventory/gap-packing-cooler-cleaning-check-inventory.component'
import { GAPPackingCoolerCleaningCheckInventoryItemComponent } from './check-inventory/item/gap-packing-cooler-cleaning-check-inventory-item.component'
import { GAPPackingCoolerCleaningCheckInventoryListComponent } from './check-inventory/list/gap-packing-cooler-cleaning-check-inventory-list.component'
import { GAPPackingCoolerCleaningCheckInventoryService } from './check-inventory/services/gap-packing-cooler-cleaning-check-inventory.service'
import { GAPPackingCoolerCleaningInventoryRoutingModule } from './routing.module'
import { GAPPackingCoolerCleaningTypeInventoryAddItemComponent } from './type-inventory/add-item/gap-packing-cooler-cleaning-type-inventory-add-item.component'
import { GAPPackingCoolerCleaningTypeInventoryComponent } from './type-inventory/inventory/gap-packing-cooler-cleaning-type-inventory.component'
import { GAPPackingCoolerCleaningTypeInventoryItemComponent } from './type-inventory/item/gap-packing-cooler-cleaning-type-inventory-item.component'
import { GAPPackingCoolerCleaningTypeInventoryListComponent } from './type-inventory/list/gap-packing-cooler-cleaning-type-inventory-list.component'
import { GAPPackingCoolerCleaningTypeInventoryService } from './type-inventory/services/gap-packing-cooler-cleaning-type-inventory.service'
import { GAPPackingCoolerCleaningInventoryViewerComponent } from './viewer/gap-packing-cooler-cleaning-inventory-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingCoolerCleaningInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingCoolerCleaningAreaInventoryComponent,
    GAPPackingCoolerCleaningAreaInventoryItemComponent,
    GAPPackingCoolerCleaningAreaInventoryListComponent,
    GAPPackingCoolerCleaningAreaInventoryAddItemComponent,
    GAPPackingCoolerCleaningCheckInventoryComponent,
    GAPPackingCoolerCleaningCheckInventoryItemComponent,
    GAPPackingCoolerCleaningCheckInventoryListComponent,
    GAPPackingCoolerCleaningCheckInventoryAddItemComponent,
    GAPPackingCoolerCleaningTypeInventoryComponent,
    GAPPackingCoolerCleaningTypeInventoryItemComponent,
    GAPPackingCoolerCleaningTypeInventoryListComponent,
    GAPPackingCoolerCleaningTypeInventoryAddItemComponent,
    GAPPackingCoolerCleaningInventoryViewerComponent
  ],
  providers: [
    GAPPackingCoolerCleaningAreaInventoryService,
    GAPPackingCoolerCleaningCheckInventoryService,
    GAPPackingCoolerCleaningTypeInventoryService
  ]
})

export class GAPPackingCoolerCleaningInventoryModule { }