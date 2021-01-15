import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingBathroomCleaningAddItemComponent } from './add-item/gmp-packing-bathroom-cleaning-add-item.component'
import { GMPPackingBathroomCleaningInventoryComponent } from './inventory/gmp-packing-bathroom-cleaning-inventory.component'
import { GMPPackingBathroomCleaningInventoryItemComponent } from './item/gmp-packing-bathroom-cleaning-inventory-item.component'
import { GMPPackingBathroomCleaningInventoryListComponent } from './list/gmp-packing-bathroom-cleaning-inventory-list.component'
import { GMPPackingBathroomCleaningInventoryViewerComponent } from './viewer/gmp-packing-bathroom-cleaning-inventory-viewer.component'
import { GMPPackingBathroomCleaningInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingBathroomCleaningInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingBathroomCleaningInventoryComponent,
    GMPPackingBathroomCleaningInventoryItemComponent,
    GMPPackingBathroomCleaningInventoryListComponent,
    GMPPackingBathroomCleaningAddItemComponent,
    GMPPackingBathroomCleaningInventoryViewerComponent
  ]
})

export class GMPPackingBathroomCleaningInventoryModule { }