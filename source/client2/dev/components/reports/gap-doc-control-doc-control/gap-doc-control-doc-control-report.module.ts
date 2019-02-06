import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPDocControlDocControlReportLoaderComponent } from './loader/gap.doc.control.doc.control.report.loader.component'
import { GAPDocControlDocControlReportComponent } from './report/gap.doc.control.doc.control.report'
import { GAPDocControlDocControlReportViewerComponent } from './viewer/gap.doc.control.doc.control.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPDocControlDocControlReportViewerComponent,
    GAPDocControlDocControlReportLoaderComponent,
    GAPDocControlDocControlReportComponent
  ],
  exports: [
    GAPDocControlDocControlReportViewerComponent
  ]
})

export class GAPDocControlDocControlReportModule { }
