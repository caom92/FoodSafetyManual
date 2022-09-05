import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { PlotlyViaWindowModule } from 'angular-plotly.js'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingPestControlInspectionInteriorReportLoaderComponent } from './loader/gap-packing-pest-control-inspection-interior-report-loader.component'
import { GAPPackingPestControlInspectionInteriorReportOverviewComponent } from './overview/gap-packing-pest-control-inspection-interior-report-overview.component'
import { GAPPackingPestControlInspectionInteriorReportComponent } from './report/gap-packing-pest-control-inspection-interior-report.component'
import { GAPPackingPestControlInspectionInteriorReportViewerComponent } from './viewer/gap-packing-pest-control-inspection-interior-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    PlotlyViaWindowModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionInteriorReportViewerComponent,
    GAPPackingPestControlInspectionInteriorReportLoaderComponent,
    GAPPackingPestControlInspectionInteriorReportComponent,
    GAPPackingPestControlInspectionInteriorReportOverviewComponent
  ],
  exports: [
    GAPPackingPestControlInspectionInteriorReportViewerComponent
  ]
})

export class GAPPackingPestControlInspectionInteriorReportModule { }
