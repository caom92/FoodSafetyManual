import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScissorsKnivesAuthorizationComponent } from './authorization/gmp.packing.scissors.knives.authorization'
import { GMPPackingScissorsKnivesLogModule } from './gmp-packing-scissors-knives-log.module'
import { GMPPackingScissorsKnivesAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingScissorsKnivesAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingScissorsKnivesLogModule
  ],
  declarations: [
    GMPPackingScissorsKnivesAuthorizationComponent
  ],
  exports: [
    GMPPackingScissorsKnivesAuthorizationComponent
  ]
})

export class GMPPackingScissorsKnivesAuthorizationModule { }
