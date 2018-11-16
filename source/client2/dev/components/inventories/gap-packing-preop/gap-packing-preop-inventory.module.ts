import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPreopAddAreaComponent } from './add-area/gap.packing.preop.add.area'
import { GAPPackingPreopAddItemComponent } from './add-item/gap.packing.preop.add.item'
import { GAPPackingPreopAreaInventoryComponent } from './area-inventory/gap.packing.preop.area.inventory'
import { GAPPackingPreopAreaInventoryListComponent } from './area-list/gap.packing.preop.area.inventory.list'
import { GAPPackingPreopAreaInventoryAreaComponent } from './area/gap.packing.preop.area.inventory.area'
import { GAPPackingPreopInventoryComponent } from './inventory/gap.packing.preop.inventory'
import { GAPPackingPreopInventoryItemComponent } from './item/gap.packing.preop.inventory.item'
import { GAPPackingPreopInventoryListComponent } from './list/gap.packing.preop.inventory.list'
import { GAPPackingPreopInventoryViewerComponent } from './viewer/gap.packing.preop.inventory.viewer.component'
import { GAPPackingPreopInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingPreopInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPreopInventoryViewerComponent,
    GAPPackingPreopInventoryComponent,
    GAPPackingPreopInventoryListComponent,
    GAPPackingPreopInventoryItemComponent,
    GAPPackingPreopAddItemComponent,
    GAPPackingPreopAreaInventoryComponent,
    GAPPackingPreopAreaInventoryListComponent,
    GAPPackingPreopAreaInventoryAreaComponent,
    GAPPackingPreopAddAreaComponent
  ]
})

export class GAPPackingPreopInventoryModule { }
