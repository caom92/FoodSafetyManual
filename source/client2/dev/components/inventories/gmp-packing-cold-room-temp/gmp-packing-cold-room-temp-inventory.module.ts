import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingColdRoomTempAddItemComponent } from './add-item/gmp.packing.cold.room.temp.add.item'
import { GMPPackingColdRoomTempInventoryComponent } from './inventory/gmp.packing.cold.room.temp.inventory'
import { GMPPackingColdRoomTempInventoryItemComponent } from './item/gmp.packing.cold.room.temp.inventory.item'
import { GMPPackingColdRoomTempInventoryListComponent } from './list/gmp.packing.cold.room.temp.inventory.list'
import { GMPPackingColdRoomTempInventoryViewerComponent } from './viewer/gmp.packing.cold.room.temp.inventory.viewer.component'
import { GMPPackingColdRoomTempInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingColdRoomTempInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingColdRoomTempInventoryComponent,
    GMPPackingColdRoomTempInventoryItemComponent,
    GMPPackingColdRoomTempInventoryListComponent,
    GMPPackingColdRoomTempAddItemComponent,
    GMPPackingColdRoomTempInventoryViewerComponent
  ]
})

export class GMPPackingColdRoomTempInventoryModule { }
