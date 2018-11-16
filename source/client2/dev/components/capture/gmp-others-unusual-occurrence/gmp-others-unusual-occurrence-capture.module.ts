import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPOthersUnusualOccurrenceLogModule } from '../../logs/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPOthersUnusualOccurrenceReportModule } from '../../reports/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-report.module'
import { GMPOthersUnusualOccurrenceCaptureComponent } from './capture/gmp-others-unusual-occurrence-capture.component'
import { GMPOthersUnusualOccurrenceCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPOthersUnusualOccurrenceCaptureRoutingModule,
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
