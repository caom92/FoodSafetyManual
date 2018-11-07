import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPDocControlDocControlReportLoaderComponent } from './loader/gmp.doc.control.doc.control.report.loader.component'
import { GMPDocControlDocControlReportComponent } from './report/gmp.doc.control.doc.control.report'
import { GMPDocControlDocControlReportViewerComponent } from './viewer/gmp.doc.control.doc.control.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-doc-control-doc-control-report', url: '/report/gmp-doc-control-doc-control', component: GMPDocControlDocControlReportViewerComponent, data: { suffix: 'gmp-doc-control-doc-control' } }

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
    GMPDocControlDocControlReportViewerComponent,
    GMPDocControlDocControlReportLoaderComponent,
    GMPDocControlDocControlReportComponent
  ],
  exports: [
    GMPDocControlDocControlReportViewerComponent
  ]
})

export class GMPDocControlDocControlReportModule { }
