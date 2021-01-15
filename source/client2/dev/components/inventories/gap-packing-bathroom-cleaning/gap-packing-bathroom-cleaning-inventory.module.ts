import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingBathroomCleaningAddItemComponent } from './add-item/gap-packing-bathroom-cleaning-add-item.component'
import { GAPPackingBathroomCleaningInventoryComponent } from './inventory/gap-packing-bathroom-cleaning-inventory.component'
import { GAPPackingBathroomCleaningInventoryItemComponent } from './item/gap-packing-bathroom-cleaning-inventory-item.component'
import { GAPPackingBathroomCleaningInventoryListComponent } from './list/gap-packing-bathroom-cleaning-inventory-list.component'
import { GAPPackingBathroomCleaningInventoryViewerComponent } from './viewer/gap-packing-bathroom-cleaning-inventory-viewer.component'
import { GAPPackingBathroomCleaningInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingBathroomCleaningInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingBathroomCleaningInventoryComponent,
    GAPPackingBathroomCleaningInventoryItemComponent,
    GAPPackingBathroomCleaningInventoryListComponent,
    GAPPackingBathroomCleaningAddItemComponent,
    GAPPackingBathroomCleaningInventoryViewerComponent
  ]
})

export class GAPPackingBathroomCleaningInventoryModule { }