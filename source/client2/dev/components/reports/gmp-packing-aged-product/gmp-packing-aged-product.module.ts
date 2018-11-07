import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingAgedProductReportLoaderComponent } from './loader/gmp.packing.aged.product.report.loader.component'
import { GMPPackingAgedProductReportComponent } from './report/gmp.packing.aged.product.report'
import { GMPPackingAgedProductReportViewerComponent } from './viewer/gmp.packing.aged.product.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-aged-product-report', url: '/report/gmp-packing-aged-product', component: GMPPackingAgedProductReportViewerComponent, data: { suffix: 'gmp-packing-aged-product' } }

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
    GMPPackingAgedProductReportViewerComponent,
    GMPPackingAgedProductReportLoaderComponent,
    GMPPackingAgedProductReportComponent
  ],
  exports: [
    GMPPackingAgedProductReportViewerComponent
  ]
})

export class GMPPackingAgedProductReportModule { }
