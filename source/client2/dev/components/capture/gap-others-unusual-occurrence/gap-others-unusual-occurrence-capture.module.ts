import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPOthersUnusualOccurrenceLogModule } from '../../logs/gap-others-unusual-occurrence/gap-others-unusual-occurrence-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPOthersUnusualOccurrenceReportModule } from '../../reports/gap-others-unusual-occurrence/gap-others-unusual-occurrence-report.module'
import { GAPOthersUnusualOccurrenceCaptureComponent } from './capture/gap-others-unusual-occurrence-capture.component'
import { GAPOthersUnusualOccurrenceCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPOthersUnusualOccurrenceCaptureRoutingModule,
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
