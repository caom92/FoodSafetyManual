import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingOzoneWaterReportLoaderComponent } from './loader/gmp.packing.ozone.water.report.loader.component'
import { GMPPackingOzoneWaterReportComponent } from './report/gmp.packing.ozone.water.report'
import { GMPPackingOzoneWaterReportViewerComponent } from './viewer/gmp.packing.ozone.water.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterReportViewerComponent,
    GMPPackingOzoneWaterReportLoaderComponent,
    GMPPackingOzoneWaterReportComponent
  ],
  exports: [
    GMPPackingOzoneWaterReportViewerComponent
  ]
})

export class GMPPackingOzoneWaterReportModule { }
