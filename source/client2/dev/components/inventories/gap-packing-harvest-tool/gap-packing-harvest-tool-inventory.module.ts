import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingHarvestToolAddItemComponent } from './add-item/gap-packing-harvest-tool-add-item.component'
import { GAPPackingHarvestToolInventoryComponent } from './inventory/gap-packing-harvest-tool-inventory.component'
import { GAPPackingHarvestToolInventoryItemComponent } from './item/gap-packing-harvest-tool-inventory-item.component'
import { GAPPackingHarvestToolInventoryListComponent } from './list/gap-packing-harvest-tool-inventory-list.component'
import { GAPPackingHarvestToolInventoryViewerComponent } from './viewer/gap-packing-harvest-tool-inventory-viewer.component'
import { GAPPackingHarvestToolInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingHarvestToolInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestToolInventoryComponent,
    GAPPackingHarvestToolInventoryItemComponent,
    GAPPackingHarvestToolInventoryListComponent,
    GAPPackingHarvestToolAddItemComponent,
    GAPPackingHarvestToolInventoryViewerComponent
  ]
})

export class GAPPackingHarvestToolInventoryModule { }