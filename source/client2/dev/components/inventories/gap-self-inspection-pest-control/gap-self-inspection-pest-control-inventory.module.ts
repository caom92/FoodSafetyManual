import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { DragulaModule } from 'ng2-dragula'
import { MaterializeModule } from 'ngx-materialize'

import { GAPSelfInspectionPestControlAddAreaComponent } from './add-area/gap.self.inspection.pest.control.add.area'
import { GAPSelfInspectionPestControlAddItemComponent } from './add-item/gap.self.inspection.pest.control.add.item'
import { GAPSelfInspectionPestControlAreaInventoryComponent } from './area-inventory/gap.self.inspection.pest.control.area.inventory'
import { GAPSelfInspectionPestControlAreaInventoryListComponent } from './area-list/gap.self.inspection.pest.control.area.inventory.list'
import { GAPSelfInspectionPestControlAreaInventoryAreaComponent } from './area/gap.self.inspection.pest.control.area.inventory.area'
import { GAPSelfInspectionPestControlInventoryComponent } from './inventory/gap.self.inspection.pest.control.inventory'
import { GAPSelfInspectionPestControlInventoryItemComponent } from './item/gap.self.inspection.pest.control.inventory.item'
import { GAPSelfInspectionPestControlInventoryListComponent } from './list/gap.self.inspection.pest.control.inventory.list'
import { GAPSelfInspectionPestControlInventoryViewerComponent } from './viewer/gap.self.inspection.pest.control.inventory.viewer.component'
import { GAPSelfInspectionPestControlInventoryRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragulaModule,
    GAPSelfInspectionPestControlInventoryRoutingModule,
    CommonModule
  ],
  declarations: [
    GAPSelfInspectionPestControlInventoryViewerComponent,
    GAPSelfInspectionPestControlInventoryComponent,
    GAPSelfInspectionPestControlInventoryItemComponent,
    GAPSelfInspectionPestControlInventoryListComponent,
    GAPSelfInspectionPestControlAreaInventoryComponent,
    GAPSelfInspectionPestControlAreaInventoryAreaComponent,
    GAPSelfInspectionPestControlAreaInventoryListComponent,
    GAPSelfInspectionPestControlAddAreaComponent,
    GAPSelfInspectionPestControlAddItemComponent
  ]
})

export class GAPSelfInspectionPestControlInventoryModule { }
