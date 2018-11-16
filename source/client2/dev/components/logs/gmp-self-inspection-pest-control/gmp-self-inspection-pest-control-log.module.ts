import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPSelfInspectionPestControlAreaComponent } from './area/gmp.self.inspection.pest.control.area'
import { GMPSelfInspectionPestControlItemComponent } from './item/gmp.self.inspection.pest.control.item'
import { GMPSelfInspectionPestControlLogComponent } from './log/gmp.self.inspection.pest.control.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPSelfInspectionPestControlLogComponent,
    GMPSelfInspectionPestControlAreaComponent,
    GMPSelfInspectionPestControlItemComponent
  ],
  exports: [
    GMPSelfInspectionPestControlLogComponent,
    GMPSelfInspectionPestControlAreaComponent,
    GMPSelfInspectionPestControlItemComponent
  ]
})

export class GMPSelfInspectionPestControlLogModule { }
