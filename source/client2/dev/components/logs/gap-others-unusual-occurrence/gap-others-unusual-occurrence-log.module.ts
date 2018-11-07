import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPOthersUnusualOccurrenceLogComponent } from './log/gap.others.unusual.occurrence.log'

const logState: Ng2StateDeclaration = { name: 'gap-others-unusual-occurrence-capture', url: '/capture/gap-others-unusual-occurrence', component: GAPOthersUnusualOccurrenceLogComponent, data: { suffix: 'gap-others-unusual-occurrence' } }

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
    GAPOthersUnusualOccurrenceLogComponent
  ],
  exports: [
    GAPOthersUnusualOccurrenceLogComponent
  ]
})

export class GAPOthersUnusualOccurrenceLogModule { }