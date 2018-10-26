import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHandWashingAddItemComponent } from './add-item/gmp.packing.hand.washing.add.item'
import { GMPPackingHandWashingInventoryComponent } from './inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingHandWashingInventoryItemComponent } from './item/gmp.packing.hand.washing.inventory.item'
import { GMPPackingHandWashingInventoryListComponent } from './list/gmp.packing.hand.washing.inventory.list'
import { GMPPackingHandWashingInventoryViewerComponent } from './viewer/gmp.packing.hand.washing.inventory.viewer.component'

const inventoryState: Ng2StateDeclaration = { name: 'gmp-packing-hand-washing-inventory', url: '/inventory/gmp-packing-hand-washing', component: GMPPackingHandWashingInventoryViewerComponent, data: { suffix: 'gmp-packing-hand-washing' } }

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
    GMPPackingHandWashingInventoryComponent,
    GMPPackingHandWashingInventoryItemComponent,
    GMPPackingHandWashingInventoryListComponent,
    GMPPackingHandWashingAddItemComponent,
    GMPPackingHandWashingInventoryViewerComponent
  ]
})

export class GMPPackingHandWashingInventoryModule { }
