import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportHeaderComponent } from './report-header/report-header.component'
import { ReportPreviewComponent } from './report-preview/report-preview.component'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    CommonModule
  ],
  declarations: [
    ReportPreviewComponent,
    ReportHeaderComponent
  ],
  exports: [
    ReportPreviewComponent,
    ReportHeaderComponent
  ]
})

export class ReportCommonModule { }
