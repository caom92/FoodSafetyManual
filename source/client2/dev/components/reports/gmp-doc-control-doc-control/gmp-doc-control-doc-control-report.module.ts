import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPDocControlDocControlReportLoaderComponent } from './loader/gmp.doc.control.doc.control.report.loader.component'
import { GMPDocControlDocControlReportComponent } from './report/gmp.doc.control.doc.control.report'
import { GMPDocControlDocControlReportViewerComponent } from './viewer/gmp.doc.control.doc.control.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPDocControlDocControlReportViewerComponent,
    GMPDocControlDocControlReportLoaderComponent,
    GMPDocControlDocControlReportComponent
  ],
  exports: [
    GMPDocControlDocControlReportViewerComponent
  ]
})

export class GMPDocControlDocControlReportModule { }
