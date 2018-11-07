import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingATPTestingReportAreaComponent } from './entry/gmp.packing.atp.testing.entry'
import { GMPPackingATPTestingReportLoaderComponent } from './loader/gmp.packing.atp.testing.report.loader.component'
import { GMPPackingATPTestingReportComponent } from './report/gmp.packing.atp.testing.report'
import { GMPPackingATPTestingReportItemComponent } from './test/gmp.packing.atp.testing.test'
import { GMPPackingATPTestingReportViewerComponent } from './viewer/gmp.packing.atp.testing.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-atp-testing-report', url: '/report/gmp-packing-atp-testing', component: GMPPackingATPTestingReportViewerComponent, data: { suffix: 'gmp-packing-atp-testing' } }

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
    GMPPackingATPTestingReportViewerComponent,
    GMPPackingATPTestingReportLoaderComponent,
    GMPPackingATPTestingReportComponent,
    GMPPackingATPTestingReportAreaComponent,
    GMPPackingATPTestingReportItemComponent
  ],
  exports: [
    GMPPackingATPTestingReportViewerComponent
  ]
})

export class GMPPackingATPTestingReportModule { }
