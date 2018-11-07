import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingScissorsKnivesReportItemComponent } from './item/gmp.packing.scissors.knives.report.item'
import { GMPPackingScissorsKnivesReportLoaderComponent } from './loader/gmp.packing.scissors.knives.report.loader.component'
import { GMPPackingScissorsKnivesReportComponent } from './report/gmp.packing.scissors.knives.report'
import { GMPPackingScissorsKnivesReportViewerComponent } from './viewer/gmp.packing.scissors.knives.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-scissors-knives-report', url: '/report/gmp-packing-scissors-knives', component: GMPPackingScissorsKnivesReportViewerComponent, data: { suffix: 'gmp-packing-scissors-knives' } }

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
    GMPPackingScissorsKnivesReportViewerComponent,
    GMPPackingScissorsKnivesReportLoaderComponent,
    GMPPackingScissorsKnivesReportComponent,
    GMPPackingScissorsKnivesReportItemComponent
  ],
  exports: [
    GMPPackingScissorsKnivesReportViewerComponent
  ]
})

export class GMPPackingScissorsKnivesReportModule { }
