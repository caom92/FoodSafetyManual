import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gmp.others.unusual.occurrence.authorization'
import { GMPOthersUnusualOccurrenceLogModule } from './gmp-others-unusual-occurrence-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-others-unusual-occurrence-authorization', url: '/authorizations/gmp-others-unusual-occurrence/:report_id', component: GMPOthersUnusualOccurrenceAuthorizationComponent, data: { suffix: 'gmp-others-unusual-occurrence' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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