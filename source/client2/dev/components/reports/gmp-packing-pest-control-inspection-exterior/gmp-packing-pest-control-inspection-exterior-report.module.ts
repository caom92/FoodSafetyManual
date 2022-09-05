import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { PlotlyViaWindowModule } from 'angular-plotly.js'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingPestControlInspectionExteriorReportLoaderComponent } from './loader/gmp-packing-pest-control-inspection-exterior-report-loader.component'
import { GMPPackingPestControlInspectionExteriorReportOverviewComponent } from './overview/gmp-packing-pest-control-inspection-exterior-report-overview.component'
import { GMPPackingPestControlInspectionExteriorReportComponent } from './report/gmp-packing-pest-control-inspection-exterior-report.component'
import { GMPPackingPestControlInspectionExteriorReportViewerComponent } from './viewer/gmp-packing-pest-control-inspection-exterior-report-viewer.component'

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
    GMPPackingPestControlInspectionExteriorReportViewerComponent,
    GMPPackingPestControlInspectionExteriorReportLoaderComponent,
    GMPPackingPestControlInspectionExteriorReportComponent,
    GMPPackingPestControlInspectionExteriorReportOverviewComponent
  ],
  exports: [
    GMPPackingPestControlInspectionExteriorReportViewerComponent
  ]
})

export class GMPPackingPestControlInspectionExteriorReportModule { }
