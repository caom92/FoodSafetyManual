import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionExteriorAuthorizationComponent } from './authorization/gmp-packing-pest-control-inspection-exterior-authorization.component'
import { GMPPackingPestControlInspectionExteriorLogModule } from './gmp-packing-pest-control-inspection-exterior-log.module'
import { GMPPackingPestControlInspectionExteriorAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingPestControlInspectionExteriorAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingPestControlInspectionExteriorLogModule
  ],
  declarations: [
    GMPPackingPestControlInspectionExteriorAuthorizationComponent
  ],
  exports: [
    GMPPackingPestControlInspectionExteriorAuthorizationComponent
  ]
})

export class GMPPackingPestControlInspectionExteriorAuthorizationModule { }
