import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPOthersUnusualOccurrenceLogModule } from '../../logs/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPOthersUnusualOccurrenceReportModule } from '../../reports/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence.module'
import { GMPOthersUnusualOccurrenceCaptureComponent } from './capture/gmp-others-unusual-occurrence-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-others-unusual-occurrence-log', url: '/log/gmp-others-unusual-occurrence', component: GMPOthersUnusualOccurrenceCaptureComponent, data: { suffix: 'gmp-others-unusual-occurrence' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPOthersUnusualOccurrenceLogModule,
    GMPOthersUnusualOccurrenceReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPOthersUnusualOccurrenceCaptureComponent
  ]
})

export class GMPOthersUnusualOccurrenceCaptureModule { }