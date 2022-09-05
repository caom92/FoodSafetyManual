import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionFlytrapAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-flytrap-authorization.component'
import { GAPPackingPestControlInspectionFlytrapLogModule } from './gap-packing-pest-control-inspection-flytrap-log.module'
import { GAPPackingPestControlInspectionFlytrapAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingPestControlInspectionFlytrapAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingPestControlInspectionFlytrapLogModule
  ],
  declarations: [
    GAPPackingPestControlInspectionFlytrapAuthorizationComponent
  ],
  exports: [
    GAPPackingPestControlInspectionFlytrapAuthorizationComponent
  ]
})

export class GAPPackingPestControlInspectionFlytrapAuthorizationModule { }
