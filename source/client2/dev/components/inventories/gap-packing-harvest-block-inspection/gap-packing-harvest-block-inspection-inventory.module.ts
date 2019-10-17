import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingHarvestBlockInspectionAddItemComponent } from './add-item/gap-packing-harvest-block-inspection-add-item.component'
import { GAPPackingHarvestBlockInspectionInventoryComponent } from './inventory/gap-packing-harvest-block-inspection-inventory.component'
import { GAPPackingHarvestBlockInspectionInventoryItemComponent } from './item/gap-packing-harvest-block-inspection-inventory-item.component'
import { GAPPackingHarvestBlockInspectionInventoryListComponent } from './list/gap-packing-harvest-block-inspection-inventory-list.component'
import { GAPPackingHarvestBlockInspectionInventoryViewerComponent } from './viewer/gap-packing-harvest-block-inspection-inventory-viewer.component'
import { GAPPackingHarvestBlockInspectionInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPPackingHarvestBlockInspectionInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestBlockInspectionInventoryComponent,
    GAPPackingHarvestBlockInspectionInventoryItemComponent,
    GAPPackingHarvestBlockInspectionInventoryListComponent,
    GAPPackingHarvestBlockInspectionAddItemComponent,
    GAPPackingHarvestBlockInspectionInventoryViewerComponent
  ]
})

export class GAPPackingHarvestBlockInspectionInventoryModule { }