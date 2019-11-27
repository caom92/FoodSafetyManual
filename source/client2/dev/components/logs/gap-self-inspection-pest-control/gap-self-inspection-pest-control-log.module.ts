import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPSelfInspectionPestControlAreaComponent } from './area/gap.self.inspection.pest.control.area'
import { GAPSelfInspectionPestControlItemComponent } from './item/gap.self.inspection.pest.control.item'
import { GAPSelfInspectionPestControlLogComponent } from './log/gap.self.inspection.pest.control.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPSelfInspectionPestControlLogComponent,
    GAPSelfInspectionPestControlAreaComponent,
    GAPSelfInspectionPestControlItemComponent
  ],
  exports: [
    GAPSelfInspectionPestControlLogComponent,
    GAPSelfInspectionPestControlAreaComponent,
    GAPSelfInspectionPestControlItemComponent
  ]
})

export class GAPSelfInspectionPestControlLogModule { }
