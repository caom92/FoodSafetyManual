import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingFinishedProductReportLoaderComponent } from './loader/gmp.packing.finished.product.report.loader.component'
import { GMPPackingFinishedProductReportComponent } from './report/gmp.packing.finished.product.report'
import { GMPPackingFinishedProductReportViewerComponent } from './viewer/gmp.packing.finished.product.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingFinishedProductReportViewerComponent,
    GMPPackingFinishedProductReportLoaderComponent,
    GMPPackingFinishedProductReportComponent
  ],
  exports: [
    GMPPackingFinishedProductReportViewerComponent
  ]
})

export class GMPPackingFinishedProductReportModule { }
