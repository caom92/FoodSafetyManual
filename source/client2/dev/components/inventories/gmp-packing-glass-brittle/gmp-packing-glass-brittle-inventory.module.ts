import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingGlassBrittleAddAreaComponent } from './add-area/gmp.packing.glass.brittle.add.area'
import { GMPPackingGlassBrittleAddItemComponent } from './add-item/gmp.packing.glass.brittle.add.item'
import { GMPPackingGlassBrittleAreaInventoryComponent } from './area-inventory/gmp.packing.glass.brittle.area.inventory'
import { GMPPackingGlassBrittleAreaInventoryListComponent } from './area-list/gmp.packing.glass.brittle.area.inventory.list'
import { GMPPackingGlassBrittleAreaInventoryAreaComponent } from './area/gmp.packing.glass.brittle.area.inventory.area'
import { GMPPackingGlassBrittleInventoryComponent } from './inventory/gmp.packing.glass.brittle.inventory'
import { GMPPackingGlassBrittleInventoryItemComponent } from './item/gmp.packing.glass.brittle.inventory.item'
import { GMPPackingGlassBrittleInventoryListComponent } from './list/gmp.packing.glass.brittle.inventory.list'
import { GMPPackingGlassBrittleInventoryViewerComponent } from './viewer/gmp.packing.glass.brittle.inventory.viewer.component'
import { GMPPackingGlassBrittleInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingGlassBrittleInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingGlassBrittleInventoryViewerComponent,
    GMPPackingGlassBrittleInventoryComponent,
    GMPPackingGlassBrittleInventoryListComponent,
    GMPPackingGlassBrittleInventoryItemComponent,
    GMPPackingGlassBrittleAddItemComponent,
    GMPPackingGlassBrittleAreaInventoryComponent,
    GMPPackingGlassBrittleAreaInventoryListComponent,
    GMPPackingGlassBrittleAreaInventoryAreaComponent,    
    GMPPackingGlassBrittleAddAreaComponent
  ]
})

export class GMPPackingGlassBrittleInventoryModule { }
