import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { PlotlyViaWindowModule } from 'angular-plotly.js'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingPestControlInspectionInteriorReportLoaderComponent } from './loader/gmp-packing-pest-control-inspection-interior-report-loader.component'
import { GMPPackingPestControlInspectionInteriorReportOverviewComponent } from './overview/gmp-packing-pest-control-inspection-interior-report-overview.component'
import { GMPPackingPestControlInspectionInteriorReportComponent } from './report/gmp-packing-pest-control-inspection-interior-report.component'
import { GMPPackingPestControlInspectionInteriorReportViewerComponent } from './viewer/gmp-packing-pest-control-inspection-interior-report-viewer.component'

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
    GMPPackingPestControlInspectionInteriorReportViewerComponent,
    GMPPackingPestControlInspectionInteriorReportLoaderComponent,
    GMPPackingPestControlInspectionInteriorReportComponent,
    GMPPackingPestControlInspectionInteriorReportOverviewComponent
  ],
  exports: [
    GMPPackingPestControlInspectionInteriorReportViewerComponent
  ]
})

export class GMPPackingPestControlInspectionInteriorReportModule { }
