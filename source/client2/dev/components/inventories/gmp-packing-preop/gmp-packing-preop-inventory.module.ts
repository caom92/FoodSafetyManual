import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPreopAddAreaComponent } from './add-area/gmp.packing.preop.add.area'
import { GMPPackingPreopAddItemComponent } from './add-item/gmp.packing.preop.add.item'
import { GMPPackingPreopAreaInventoryComponent } from './area-inventory/gmp.packing.preop.area.inventory'
import { GMPPackingPreopAreaInventoryListComponent } from './area-list/gmp.packing.preop.area.inventory.list'
import { GMPPackingPreopAreaInventoryAreaComponent } from './area/gmp.packing.preop.area.inventory.area'
import { GMPPackingPreopFormInventoryComponent } from './form-inventory/gmp.packing.preop.form.inventory'
import { GMPPackingPreopInventoryComponent } from './inventory/gmp.packing.preop.inventory'
import { GMPPackingPreopInventoryItemComponent } from './item/gmp.packing.preop.inventory.item'
import { GMPPackingPreopInventoryListComponent } from './list/gmp.packing.preop.inventory.list'
import { GMPPackingPreopInventoryViewerComponent } from './viewer/gmp.packing.preop.inventory.viewer.component'
import { GMPPackingPreopInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingPreopInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPreopInventoryViewerComponent,
    GMPPackingPreopInventoryComponent,
    GMPPackingPreopInventoryListComponent,
    GMPPackingPreopInventoryItemComponent,
    GMPPackingPreopAddItemComponent,
    GMPPackingPreopFormInventoryComponent,
    GMPPackingPreopAreaInventoryComponent,
    GMPPackingPreopAreaInventoryListComponent,
    GMPPackingPreopAreaInventoryAreaComponent,
    GMPPackingPreopAddAreaComponent
  ]
})

export class GMPPackingPreopInventoryModule { }
