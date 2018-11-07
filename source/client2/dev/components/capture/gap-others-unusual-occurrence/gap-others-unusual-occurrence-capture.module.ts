import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPOthersUnusualOccurrenceLogModule } from '../../logs/gap-others-unusual-occurrence/gap-others-unusual-occurrence-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPOthersUnusualOccurrenceReportModule } from '../../reports/gap-others-unusual-occurrence/gap-others-unusual-occurrence.module'
import { GAPOthersUnusualOccurrenceCaptureComponent } from './capture/gap-others-unusual-occurrence-capture.component'

const logState: Ng2StateDeclaration = { name: 'gap-others-unusual-occurrence-log', url: '/log/gap-others-unusual-occurrence', component: GAPOthersUnusualOccurrenceCaptureComponent, data: { suffix: 'gap-others-unusual-occurrence' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GAPOthersUnusualOccurrenceLogModule,
    GAPOthersUnusualOccurrenceReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPOthersUnusualOccurrenceCaptureComponent
  ]
})

export class GAPOthersUnusualOccurrenceCaptureModule { }