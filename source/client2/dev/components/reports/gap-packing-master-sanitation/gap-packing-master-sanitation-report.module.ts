import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingMasterSanitationReportLoaderComponent } from './loader/gap-packing-master-sanitation-report-loader.component'
import { GAPPackingMasterSanitationReportComponent } from './report/gap-packing-master-sanitation-report.component'
import { GAPPackingMasterSanitationReportViewerComponent } from './viewer/gap-packing-master-sanitation-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingMasterSanitationReportViewerComponent,
    GAPPackingMasterSanitationReportLoaderComponent,
    GAPPackingMasterSanitationReportComponent
  ],
  exports: [
    GAPPackingMasterSanitationReportViewerComponent
  ]
})

export class GAPPackingMasterSanitationReportModule { }
