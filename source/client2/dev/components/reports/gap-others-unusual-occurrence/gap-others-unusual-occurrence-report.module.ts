import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPOthersUnusualOccurrenceReportLoaderComponent } from './loader/gap.others.unusual.occurrence.report.loader.component'
import { GAPOthersUnusualOccurrenceReportComponent } from './report/gap.others.unusual.occurrence.report'
import { GAPOthersUnusualOccurrenceReportViewerComponent } from './viewer/gap.others.unusual.occurrence.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPOthersUnusualOccurrenceReportViewerComponent,
    GAPOthersUnusualOccurrenceReportLoaderComponent,
    GAPOthersUnusualOccurrenceReportComponent
  ],
  exports: [
    GAPOthersUnusualOccurrenceReportViewerComponent
  ]
})

export class GAPOthersUnusualOccurrenceReportModule { }