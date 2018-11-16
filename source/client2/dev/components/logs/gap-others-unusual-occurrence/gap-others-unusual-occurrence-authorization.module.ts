import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gap.others.unusual.occurrence.authorization'
import { GAPOthersUnusualOccurrenceLogModule } from './gap-others-unusual-occurrence-log.module'
import { GAPOthersUnusualOccurrenceAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPOthersUnusualOccurrenceAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPOthersUnusualOccurrenceLogModule
  ],
  declarations: [
    GAPOthersUnusualOccurrenceAuthorizationComponent
  ],
  exports: [
    GAPOthersUnusualOccurrenceAuthorizationComponent
  ]
})

export class GAPOthersUnusualOccurrenceAuthorizationModule { }
