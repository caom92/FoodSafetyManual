import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingBathroomCleaningAuthorizationComponent } from './authorization/gap-packing-bathroom-cleaning-authorization.component'
import { GAPPackingBathroomCleaningLogModule } from './gap-packing-bathroom-cleaning-log.module'
import { GAPPackingBathroomCleaningAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingBathroomCleaningAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingBathroomCleaningLogModule
  ],
  declarations: [
    GAPPackingBathroomCleaningAuthorizationComponent
  ],
  exports: [
    GAPPackingBathroomCleaningAuthorizationComponent
  ]
})

export class GAPPackingBathroomCleaningAuthorizationModule { }
