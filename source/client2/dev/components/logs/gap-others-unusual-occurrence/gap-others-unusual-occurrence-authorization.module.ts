import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gap.others.unusual.occurrence.authorization'
import { GAPOthersUnusualOccurrenceLogModule } from './gap-others-unusual-occurrence-log.module'

const logState: Ng2StateDeclaration = { name: 'gap-others-unusual-occurrence-authorization', url: '/authorizations/gap-others-unusual-occurrence/:report_id', component: GAPOthersUnusualOccurrenceAuthorizationComponent, data: { suffix: 'gap-others-unusual-occurrence' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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