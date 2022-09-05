import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionInteriorAuthorizationComponent } from './authorization/gap-packing-pest-control-inspection-interior-authorization.component'
import { GAPPackingPestControlInspectionInteriorLogModule } from './gap-packing-pest-control-inspection-interior-log.module'
import { GAPPackingPestControlInspectionInteriorAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingPestControlInspectionInteriorAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingPestControlInspectionInteriorLogModule
  ],
  declarations: [
    GAPPackingPestControlInspectionInteriorAuthorizationComponent
  ],
  exports: [
    GAPPackingPestControlInspectionInteriorAuthorizationComponent
  ]
})

export class GAPPackingPestControlInspectionInteriorAuthorizationModule { }
