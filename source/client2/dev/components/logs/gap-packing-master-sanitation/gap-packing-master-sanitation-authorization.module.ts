import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingMasterSanitationAuthorizationComponent } from './authorization/gap-packing-master-sanitation-authorization.component'
import { GAPPackingMasterSanitationLogModule } from './gap-packing-master-sanitation-log.module'
import { GAPPackingMasterSanitationAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingMasterSanitationAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingMasterSanitationLogModule
  ],
  declarations: [
    GAPPackingMasterSanitationAuthorizationComponent
  ],
  exports: [
    GAPPackingMasterSanitationAuthorizationComponent
  ]
})

export class GAPPackingMasterSanitationAuthorizationModule { }
