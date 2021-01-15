import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingBathroomCleaningAuthorizationComponent } from './authorization/gmp-packing-bathroom-cleaning-authorization.component'
import { GMPPackingBathroomCleaningLogModule } from './gmp-packing-bathroom-cleaning-log.module'
import { GMPPackingBathroomCleaningAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingBathroomCleaningAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingBathroomCleaningLogModule
  ],
  declarations: [
    GMPPackingBathroomCleaningAuthorizationComponent
  ],
  exports: [
    GMPPackingBathroomCleaningAuthorizationComponent
  ]
})

export class GMPPackingBathroomCleaningAuthorizationModule { }
