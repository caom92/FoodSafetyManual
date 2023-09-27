import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingCoolerCleaningAuthorizationComponent } from './authorization/gap-packing-cooler-cleaning-authorization.component'
import { GAPPackingCoolerCleaningLogModule } from './gap-packing-cooler-cleaning-log.module'
import { GAPPackingCoolerCleaningAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingCoolerCleaningAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingCoolerCleaningLogModule
  ],
  declarations: [
    GAPPackingCoolerCleaningAuthorizationComponent
  ],
  exports: [
    GAPPackingCoolerCleaningAuthorizationComponent
  ]
})

export class GAPPackingCoolerCleaningAuthorizationModule { }
