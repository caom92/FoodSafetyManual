import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPSelfInspectionPestControlAuthorizationComponent } from './authorization/gap.self.inspection.pest.control.authorization'
import { GAPSelfInspectionPestControlLogModule } from './gap-self-inspection-pest-control-log.module'
import { GAPSelfInspectionPestControlAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPSelfInspectionPestControlAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPSelfInspectionPestControlLogModule
  ],
  declarations: [
    GAPSelfInspectionPestControlAuthorizationComponent
  ],
  exports: [
    GAPSelfInspectionPestControlAuthorizationComponent
  ]
})

export class GAPSelfInspectionPestControlAuthorizationModule { }
