import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingWaterResourceAddAreaComponent } from './add-area/gap.packing.water.resource.add.area'
import { GAPPackingWaterResourceAddItemComponent } from './add-item/gap.packing.water.resource.add.item'
import { GAPPackingWaterResourceAreaInventoryComponent } from './area-inventory/gap.packing.water.resource.area.inventory'
import { GAPPackingWaterResourceAreaInventoryListComponent } from './area-list/gap.packing.water.resource.area.inventory.list'
import { GAPPackingWaterResourceAreaInventoryAreaComponent } from './area/gap.packing.water.resource.area.inventory.area'
import { GAPPackingWaterResourceInventoryComponent } from './inventory/gap.packing.water.resource.inventory'
import { GAPPackingWaterResourceInventoryItemComponent } from './item/gap.packing.water.resource.inventory.item'
import { GAPPackingWaterResourceInventoryListComponent } from './list/gap.packing.water.resource.inventory.list'
import { GAPPackingWaterResourceInventoryViewerComponent } from './viewer/gap.packing.water.resource.inventory.viewer.component'
import { GAPPackingWaterResourceInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingWaterResourceInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingWaterResourceInventoryViewerComponent,
    GAPPackingWaterResourceInventoryComponent,
    GAPPackingWaterResourceInventoryListComponent,
    GAPPackingWaterResourceInventoryItemComponent,
    GAPPackingWaterResourceAddItemComponent,
    GAPPackingWaterResourceAreaInventoryComponent,
    GAPPackingWaterResourceAreaInventoryListComponent,
    GAPPackingWaterResourceAreaInventoryAreaComponent,    
    GAPPackingWaterResourceAddAreaComponent
  ]
})

export class GAPPackingWaterResourceInventoryModule { }
