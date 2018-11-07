import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingHandWashingReportItemComponent } from './item/gmp.packing.hand.washing.item'
import { GMPPackingHandWashingReportLoaderComponent } from './loader/gmp.packing.hand.washing.report.loader.component'
import { GMPPackingHandWashingReportComponent } from './report/gmp.packing.hand.washing.report'
import { GMPPackingHandWashingReportViewerComponent } from './viewer/gmp.packing.hand.washing.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-hand-washing-report', url: '/report/gmp-packing-hand-washing', component: GMPPackingHandWashingReportViewerComponent, data: { suffix: 'gmp-packing-hand-washing' } }

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
    GMPPackingHandWashingReportViewerComponent,
    GMPPackingHandWashingReportLoaderComponent,
    GMPPackingHandWashingReportComponent,
    GMPPackingHandWashingReportItemComponent
  ],
  exports: [
    GMPPackingHandWashingReportViewerComponent
  ]
})

export class GMPPackingHandWashingReportModule { }
