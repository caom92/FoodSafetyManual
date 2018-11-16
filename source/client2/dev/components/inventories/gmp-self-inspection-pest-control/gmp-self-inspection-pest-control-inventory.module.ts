import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GMPSelfInspectionPestControlAddAreaComponent } from './add-area/gmp.self.inspection.pest.control.add.area'
import { GMPSelfInspectionPestControlAddItemComponent } from './add-item/gmp.self.inspection.pest.control.add.item'
import { GMPSelfInspectionPestControlAreaInventoryComponent } from './area-inventory/gmp.self.inspection.pest.control.area.inventory'
import { GMPSelfInspectionPestControlAreaInventoryListComponent } from './area-list/gmp.self.inspection.pest.control.area.inventory.list'
import { GMPSelfInspectionPestControlAreaInventoryAreaComponent } from './area/gmp.self.inspection.pest.control.area.inventory.area'
import { GMPSelfInspectionPestControlInventoryComponent } from './inventory/gmp.self.inspection.pest.control.inventory'
import { GMPSelfInspectionPestControlInventoryItemComponent } from './item/gmp.self.inspection.pest.control.inventory.item'
import { GMPSelfInspectionPestControlInventoryListComponent } from './list/gmp.self.inspection.pest.control.inventory.list'
import { GMPSelfInspectionPestControlInventoryViewerComponent } from './viewer/gmp.self.inspection.pest.control.inventory.viewer.component'
import { GMPSelfInspectionPestControlInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GMPSelfInspectionPestControlInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GMPSelfInspectionPestControlInventoryViewerComponent,
    GMPSelfInspectionPestControlInventoryComponent,
    GMPSelfInspectionPestControlInventoryItemComponent,
    GMPSelfInspectionPestControlInventoryListComponent,
    GMPSelfInspectionPestControlAreaInventoryComponent,
    GMPSelfInspectionPestControlAreaInventoryAreaComponent,
    GMPSelfInspectionPestControlAreaInventoryListComponent,
    GMPSelfInspectionPestControlAddAreaComponent,
    GMPSelfInspectionPestControlAddItemComponent
  ]
})

export class GMPSelfInspectionPestControlInventoryModule { }
