import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPreopAddAreaComponent } from './add-area/gmp.packing.preop.add.area'
import { GMPPackingPreopAddItemComponent } from './add-item/gmp.packing.preop.add.item'
import { GMPPackingPreopAreaInventoryComponent } from './area-inventory/gmp.packing.preop.area.inventory'
import { GMPPackingPreopAreaInventoryListComponent } from './area-list/gmp.packing.preop.area.inventory.list'
import { GMPPackingPreopAreaInventoryAreaComponent } from './area/gmp.packing.preop.area.inventory.area'
import { GMPPackingPreopInventoryComponent } from './inventory/gmp.packing.preop.inventory'
import { GMPPackingPreopInventoryItemComponent } from './item/gmp.packing.preop.inventory.item'
import { GMPPackingPreopInventoryListComponent } from './list/gmp.packing.preop.inventory.list'
import { GMPPackingPreopInventoryViewerComponent } from './viewer/gmp.packing.preop.inventory.viewer.component'

const inventoryState: Ng2StateDeclaration = { name: 'gmp-packing-preop-inventory', url: '/inventory/gmp-packing-preop', component: GMPPackingPreopInventoryViewerComponent, data: { suffix: 'gmp-packing-preop' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    UIRouterModule.forChild({ states: [ inventoryState ] }),
    CommonModule
  ],
  declarations: [
    GMPPackingPreopInventoryViewerComponent,
    GMPPackingPreopInventoryComponent,
    GMPPackingPreopInventoryListComponent,
    GMPPackingPreopInventoryItemComponent,
    GMPPackingPreopAddItemComponent,
    GMPPackingPreopAreaInventoryComponent,
    GMPPackingPreopAreaInventoryListComponent,
    GMPPackingPreopAreaInventoryAreaComponent,
    GMPPackingPreopAddAreaComponent
  ]
})

export class GMPPackingPreopInventoryModule { }
