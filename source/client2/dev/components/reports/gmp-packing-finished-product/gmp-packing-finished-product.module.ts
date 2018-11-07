import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingFinishedProductReportLoaderComponent } from './loader/gmp.packing.finished.product.report.loader.component'
import { GMPPackingFinishedProductReportComponent } from './report/gmp.packing.finished.product.report'
import { GMPPackingFinishedProductReportViewerComponent } from './viewer/gmp.packing.finished.product.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-finished-product-report', url: '/report/gmp-packing-finished-product', component: GMPPackingFinishedProductReportViewerComponent, data: { suffix: 'gmp-packing-finished-product' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [reportState] }),
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
