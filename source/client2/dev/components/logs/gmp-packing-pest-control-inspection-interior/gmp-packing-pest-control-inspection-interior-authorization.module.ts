import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionInteriorAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-interior-authorization.component'
import { GMPPackingPestControlInspectionInteriorLogModule } from './gmp-packing-pest-control-inspection-interior-log.module'
import { GMPPackingPestControlInspectionInteriorAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingPestControlInspectionInteriorAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingPestControlInspectionInteriorLogModule
  ],
  declarations: [
    GMPPackingPestControlInspectionInteriorAuthorizationComponent
  ],
  exports: [
    GMPPackingPestControlInspectionInteriorAuthorizationComponent
  ]
})

export class GMPPackingPestControlInspectionInteriorAuthorizationModule { }