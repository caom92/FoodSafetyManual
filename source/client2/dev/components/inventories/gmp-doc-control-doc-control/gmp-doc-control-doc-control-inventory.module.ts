import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPDocControlDocControlAddItemComponent } from './add-item/gmp.doc.control.doc.control.add.item'
import { GMPDocControlDocControlInventoryComponent } from './inventory/gmp.doc.control.doc.control.inventory'
import { GMPDocControlDocControlInventoryItemComponent } from './item/gmp.doc.control.doc.control.inventory.item'
import { GMPDocControlDocControlInventoryListComponent } from './list/gmp.doc.control.doc.control.inventory.list'
import { GMPDocControlDocControlInventoryViewerComponent } from './viewer/gmp.doc.control.doc.control.inventory.viewer.component'
import { GMPDocControlDocControlInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPDocControlDocControlInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPDocControlDocControlInventoryComponent,
    GMPDocControlDocControlInventoryListComponent,
    GMPDocControlDocControlInventoryItemComponent,
    GMPDocControlDocControlAddItemComponent,
    GMPDocControlDocControlInventoryViewerComponent
  ]
})

export class GMPDocControlDocControlInventoryModule { }
