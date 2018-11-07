import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPOthersUnusualOccurrenceLogComponent } from './log/gmp.others.unusual.occurrence.log'

const logState: Ng2StateDeclaration = { name: 'gmp-others-unusual-occurrence-capture', url: '/capture/gmp-others-unusual-occurrence', component: GMPOthersUnusualOccurrenceLogComponent, data: { suffix: 'gmp-others-unusual-occurrence' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPOthersUnusualOccurrenceLogComponent
  ],
  exports: [
    GMPOthersUnusualOccurrenceLogComponent
  ]
})

export class GMPOthersUnusualOccurrenceLogModule { }