import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { PlotlyViaWindowModule } from 'angular-plotly.js'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingPestControlInspectionExteriorReportLoaderComponent } from './loader/gap-packing-pest-control-inspection-exterior-report-loader.component'
import { GAPPackingPestControlInspectionExteriorReportComponent } from './report/gap-packing-pest-control-inspection-exterior-report.component'
import { GAPPackingPestControlInspectionExteriorReportOverviewComponent } from './overview/gap-packing-pest-control-inspection-exterior-report-overview.component'
import { GAPPackingPestControlInspectionExteriorReportViewerComponent } from './viewer/gap-packing-pest-control-inspection-exterior-report-viewer.component'

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
    GAPPackingPestControlInspectionExteriorReportViewerComponent,
    GAPPackingPestControlInspectionExteriorReportLoaderComponent,
    GAPPackingPestControlInspectionExteriorReportComponent,
    GAPPackingPestControlInspectionExteriorReportOverviewComponent
  ],
  exports: [
    GAPPackingPestControlInspectionExteriorReportViewerComponent
  ]
})

export class GAPPackingPestControlInspectionExteriorReportModule { }
