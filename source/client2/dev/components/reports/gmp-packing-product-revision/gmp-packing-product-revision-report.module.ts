import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingProductRevisionReportLoaderComponent } from './loader/gmp-packing-product-revision-report-loader.component'
import { GMPPackingProductRevisionReportComponent } from './report/gmp-packing-product-revision-report.component'
import { GMPPackingProductRevisionReportViewerComponent } from './viewer/gmp-packing-product-revision-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingProductRevisionReportViewerComponent,
    GMPPackingProductRevisionReportLoaderComponent,
    GMPPackingProductRevisionReportComponent
  ],
  exports: [
    GMPPackingProductRevisionReportViewerComponent
  ]
})

export class GMPPackingProductRevisionReportModule { }
