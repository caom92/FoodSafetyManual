import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPDocControlDocControlAddItemComponent } from './add-item/gap.doc.control.doc.control.add.item'
import { GAPDocControlDocControlInventoryComponent } from './inventory/gap.doc.control.doc.control.inventory'
import { GAPDocControlDocControlInventoryItemComponent } from './item/gap.doc.control.doc.control.inventory.item'
import { GAPDocControlDocControlInventoryListComponent } from './list/gap.doc.control.doc.control.inventory.list'
import { GAPDocControlDocControlInventoryViewerComponent } from './viewer/gap.doc.control.doc.control.inventory.viewer.component'
import { GAPDocControlDocControlInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPDocControlDocControlInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPDocControlDocControlInventoryComponent,
    GAPDocControlDocControlInventoryListComponent,
    GAPDocControlDocControlInventoryItemComponent,
    GAPDocControlDocControlAddItemComponent,
    GAPDocControlDocControlInventoryViewerComponent
  ]
})

export class GAPDocControlDocControlInventoryModule { }
