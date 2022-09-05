import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionExteriorAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-exterior-authorization.component'
import { GAPPackingPestControlInspectionExteriorLogModule } from './gap-packing-pest-control-inspection-exterior-log.module'
import { GAPPackingPestControlInspectionExteriorAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingPestControlInspectionExteriorAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingPestControlInspectionExteriorLogModule
  ],
  declarations: [
    GAPPackingPestControlInspectionExteriorAuthorizationComponent
  ],
  exports: [
    GAPPackingPestControlInspectionExteriorAuthorizationComponent
  ]
})

export class GAPPackingPestControlInspectionExteriorAuthorizationModule { }
