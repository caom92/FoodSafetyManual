import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPOthersUnusualOccurrenceReportLoaderComponent } from './loader/gmp.others.unusual.occurrence.report.loader.component'
import { GMPOthersUnusualOccurrenceReportComponent } from './report/gmp.others.unusual.occurrence.report'
import { GMPOthersUnusualOccurrenceReportViewerComponent } from './viewer/gmp.others.unusual.occurrence.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPOthersUnusualOccurrenceReportViewerComponent,
    GMPOthersUnusualOccurrenceReportLoaderComponent,
    GMPOthersUnusualOccurrenceReportComponent
  ],
  exports: [
    GMPOthersUnusualOccurrenceReportViewerComponent
  ]
})

export class GMPOthersUnusualOccurrenceReportModule { }
