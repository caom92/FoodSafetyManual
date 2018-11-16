import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHandWashingAddItemComponent } from './add-item/gmp.packing.hand.washing.add.item'
import { GMPPackingHandWashingInventoryComponent } from './inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingHandWashingInventoryItemComponent } from './item/gmp.packing.hand.washing.inventory.item'
import { GMPPackingHandWashingInventoryListComponent } from './list/gmp.packing.hand.washing.inventory.list'
import { GMPPackingHandWashingInventoryViewerComponent } from './viewer/gmp.packing.hand.washing.inventory.viewer.component'
import { GMPPackingHandWashingInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingHandWashingInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHandWashingInventoryComponent,
    GMPPackingHandWashingInventoryItemComponent,
    GMPPackingHandWashingInventoryListComponent,
    GMPPackingHandWashingAddItemComponent,
    GMPPackingHandWashingInventoryViewerComponent
  ]
})

export class GMPPackingHandWashingInventoryModule { }
