import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingATPLuminometerAddItemComponent } from './add-item/gmp.packing.atp.luminometer.add.item'
import { GMPPackingATPLuminometerInventoryComponent } from './inventory/gmp.packing.atp.luminometer.inventory'
import { GMPPackingATPLuminometerInventoryItemComponent } from './item/gmp.packing.atp.luminometer.inventory.item'
import { GMPPackingATPLuminometerInventoryListComponent } from './list/gmp.packing.atp.luminometer.inventory.list'
import { GMPPackingATPLuminometerInventoryViewerComponent } from './viewer/gmp.packing.atp.luminometer.inventory.viewer.component'
import { GMPPackingATPLuminometerInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPPackingATPLuminometerInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPLuminometerInventoryComponent,
    GMPPackingATPLuminometerInventoryItemComponent,
    GMPPackingATPLuminometerInventoryListComponent,
    GMPPackingATPLuminometerAddItemComponent,
    GMPPackingATPLuminometerInventoryViewerComponent
  ]
})

export class GMPPackingATPLuminometerInventoryModule { }
