import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScissorsKnivesAddItemComponent } from './add-item/gmp.packing.scissors.knives.add.item'
import { GMPPackingScissorsKnivesInventoryComponent } from './inventory/gmp.packing.scissors.knives.inventory'
import { GMPPackingScissorsKnivesInventoryItemComponent } from './item/gmp.packing.scissors.knives.inventory.item'
import { GMPPackingScissorsKnivesInventoryListComponent } from './list/gmp.packing.scissors.knives.inventory.list'
import { GMPPackingScissorsKnivesInventoryViewerComponent } from './viewer/gmp.packing.scissors.knives.inventory.viewer.component'
import { GMPPackingScissorsKnivesInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingScissorsKnivesInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScissorsKnivesInventoryComponent,
    GMPPackingScissorsKnivesInventoryItemComponent,
    GMPPackingScissorsKnivesInventoryListComponent,
    GMPPackingScissorsKnivesAddItemComponent,
    GMPPackingScissorsKnivesInventoryViewerComponent
  ]
})

export class GMPPackingScissorsKnivesInventoryModule { }
