import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingPreopReportAreaComponent } from './area/gmp.packing.preop.area'
import { GMPPackingPreopReportItemComponent } from './item/gmp.packing.preop.item'
import { GMPPackingPreopReportLoaderComponent } from './loader/gmp.packing.preop.report.loader.component'
import { GMPPackingPreopReportComponent } from './report/gmp.packing.preop.report'
import { GMPPackingPreopReportTypeComponent } from './type/gmp.packing.preop.type'
import { GMPPackingPreopReportViewerComponent } from './viewer/gmp.packing.preop.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-preop-report', url: '/report/gmp-packing-preop', component: GMPPackingPreopReportViewerComponent, data: { suffix: 'gmp-packing-preop' } }

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
    GMPPackingPreopReportViewerComponent,
    GMPPackingPreopReportLoaderComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent
  ],
  exports: [
    GMPPackingPreopReportViewerComponent
  ]
})

export class GMPPackingPreopReportModule { }
