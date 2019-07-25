import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHarvestToolAddItemComponent } from './add-item/gmp-packing-harvest-tool-add-item.component'
import { GMPPackingHarvestToolInventoryComponent } from './inventory/gmp-packing-harvest-tool-inventory.component'
import { GMPPackingHarvestToolInventoryItemComponent } from './item/gmp-packing-harvest-tool-inventory-item.component'
import { GMPPackingHarvestToolInventoryListComponent } from './list/gmp-packing-harvest-tool-inventory-list.component'
import { GMPPackingHarvestToolInventoryViewerComponent } from './viewer/gmp-packing-harvest-tool-inventory-viewer.component'
import { GMPPackingHarvestToolInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingHarvestToolInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHarvestToolInventoryComponent,
    GMPPackingHarvestToolInventoryItemComponent,
    GMPPackingHarvestToolInventoryListComponent,
    GMPPackingHarvestToolAddItemComponent,
    GMPPackingHarvestToolInventoryViewerComponent
  ]
})

export class GMPPackingHarvestToolInventoryModule { }