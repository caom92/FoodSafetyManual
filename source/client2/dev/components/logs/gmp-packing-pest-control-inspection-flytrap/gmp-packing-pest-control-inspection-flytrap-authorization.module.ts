import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionFlytrapAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-flytrap-authorization.component'
import { GMPPackingPestControlInspectionFlytrapLogModule } from './gmp-packing-pest-control-inspection-flytrap-log.module'
import { GMPPackingPestControlInspectionFlytrapAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingPestControlInspectionFlytrapAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingPestControlInspectionFlytrapLogModule
  ],
  declarations: [
    GMPPackingPestControlInspectionFlytrapAuthorizationComponent
  ],
  exports: [
    GMPPackingPestControlInspectionFlytrapAuthorizationComponent
  ]
})

export class GMPPackingPestControlInspectionFlytrapAuthorizationModule { }
