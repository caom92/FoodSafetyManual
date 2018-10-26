import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingOzoneWaterAddAreaComponent } from './add-area/gmp.packing.ozone.water.add.area'
import { GMPPackingOzoneWaterAreaInventoryComponent } from './area-inventory/gmp.packing.ozone.water.area.inventory'
import { GMPPackingOzoneWaterAreaInventoryListComponent } from './area-list/gmp.packing.ozone.water.area.inventory.list'
import { GMPPackingOzoneWaterAreaInventoryAreaComponent } from './area/gmp.packing.ozone.water.area.inventory.area'
import { GMPPackingOzoneWaterInventoryComponent } from './inventory/gmp.packing.ozone.water.inventory'
import { GMPPackingOzoneWaterInventoryItemComponent } from './item/gmp.packing.ozone.water.inventory.item'
import { GMPPackingOzoneWaterInventoryListComponent } from './list/gmp.packing.ozone.water.inventory.list'
import { GMPPackingOzoneWaterInventoryViewerComponent } from './viewer/gmp.packing.ozone.water.inventory.viewer.component'

const inventoryState: Ng2StateDeclaration = { name: 'gmp-packing-ozone-water-inventory', url: '/inventory/gmp-packing-ozone-water', component: GMPPackingOzoneWaterInventoryViewerComponent, data: { suffix: 'gmp-packing-ozone-water' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    UIRouterModule.forChild({ states: [inventoryState] }),
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterInventoryViewerComponent,
    GMPPackingOzoneWaterInventoryComponent,
    GMPPackingOzoneWaterInventoryListComponent,
    GMPPackingOzoneWaterInventoryItemComponent,
    GMPPackingOzoneWaterAreaInventoryComponent,
    GMPPackingOzoneWaterAreaInventoryAreaComponent,
    GMPPackingOzoneWaterAreaInventoryListComponent,
    GMPPackingOzoneWaterAddAreaComponent
  ]
})

export class GMPPackingOzoneWaterInventoryModule { }
