import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingPestControlInspectionFlytrapReportLoaderComponent } from './loader/gmp-packing-pest-control-inspection-flytrap-report-loader.component'
import { GMPPackingPestControlInspectionFlytrapReportComponent } from './report/gmp-packing-pest-control-inspection-flytrap-report.component'
import { GMPPackingPestControlInspectionFlytrapReportViewerComponent } from './viewer/gmp-packing-pest-control-inspection-flytrap-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionFlytrapReportViewerComponent,
    GMPPackingPestControlInspectionFlytrapReportLoaderComponent,
    GMPPackingPestControlInspectionFlytrapReportComponent
  ],
  exports: [
    GMPPackingPestControlInspectionFlytrapReportViewerComponent
  ]
})

export class GMPPackingPestControlInspectionFlytrapReportModule { }
