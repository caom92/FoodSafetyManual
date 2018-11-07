import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPOthersUnusualOccurrenceReportLoaderComponent } from './loader/gmp.others.unusual.occurrence.report.loader.component'
import { GMPOthersUnusualOccurrenceReportComponent } from './report/gmp.others.unusual.occurrence.report'
import { GMPOthersUnusualOccurrenceReportViewerComponent } from './viewer/gmp.others.unusual.occurrence.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-others-unusual-occurrence-report', url: '/report/gmp-others-unusual-occurrence', component: GMPOthersUnusualOccurrenceReportViewerComponent, data: { suffix: 'gmp-others-unusual-occurrence' } }

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
    GMPOthersUnusualOccurrenceReportViewerComponent,
    GMPOthersUnusualOccurrenceReportLoaderComponent,
    GMPOthersUnusualOccurrenceReportComponent
  ],
  exports: [
    GMPOthersUnusualOccurrenceReportViewerComponent
  ]
})

export class GMPOthersUnusualOccurrenceReportModule { }
