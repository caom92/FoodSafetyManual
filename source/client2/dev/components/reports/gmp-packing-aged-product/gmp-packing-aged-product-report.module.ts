import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingAgedProductReportLoaderComponent } from './loader/gmp.packing.aged.product.report.loader.component'
import { GMPPackingAgedProductReportComponent } from './report/gmp.packing.aged.product.report'
import { GMPPackingAgedProductReportViewerComponent } from './viewer/gmp.packing.aged.product.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingAgedProductReportViewerComponent,
    GMPPackingAgedProductReportLoaderComponent,
    GMPPackingAgedProductReportComponent
  ],
  exports: [
    GMPPackingAgedProductReportViewerComponent
  ]
})

export class GMPPackingAgedProductReportModule { }
