import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPSelfInspectionPestControlAuthorizationComponent } from './authorization/gmp.self.inspection.pest.control.authorization'
import { GMPSelfInspectionPestControlLogModule } from './gmp-self-inspection-pest-control-log.module'
import { GMPSelfInspectionPestControlAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPSelfInspectionPestControlAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPSelfInspectionPestControlLogModule
  ],
  declarations: [
    GMPSelfInspectionPestControlAuthorizationComponent
  ],
  exports: [
    GMPSelfInspectionPestControlAuthorizationComponent
  ]
})

export class GMPSelfInspectionPestControlAuthorizationModule { }
