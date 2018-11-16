import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gmp.others.unusual.occurrence.authorization'
import { GMPOthersUnusualOccurrenceLogModule } from './gmp-others-unusual-occurrence-log.module'
import { GMPOthersUnusualOccurrenceAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPOthersUnusualOccurrenceAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPOthersUnusualOccurrenceLogModule
  ],
  declarations: [
    GMPOthersUnusualOccurrenceAuthorizationComponent
  ],
  exports: [
    GMPOthersUnusualOccurrenceAuthorizationComponent
  ]
})

export class GMPOthersUnusualOccurrenceAuthorizationModule { }
