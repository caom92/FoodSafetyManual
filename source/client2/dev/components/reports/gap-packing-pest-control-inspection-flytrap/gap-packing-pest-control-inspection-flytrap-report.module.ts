import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingPestControlInspectionFlytrapReportLoaderComponent } from './loader/gap-packing-pest-control-inspection-flytrap-report-loader.component'
import { GAPPackingPestControlInspectionFlytrapReportComponent } from './report/gap-packing-pest-control-inspection-flytrap-report.component'
import { GAPPackingPestControlInspectionFlytrapReportViewerComponent } from './viewer/gap-packing-pest-control-inspection-flytrap-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionFlytrapReportViewerComponent,
    GAPPackingPestControlInspectionFlytrapReportLoaderComponent,
    GAPPackingPestControlInspectionFlytrapReportComponent
  ],
  exports: [
    GAPPackingPestControlInspectionFlytrapReportViewerComponent
  ]
})

export class GAPPackingPestControlInspectionFlytrapReportModule { }
