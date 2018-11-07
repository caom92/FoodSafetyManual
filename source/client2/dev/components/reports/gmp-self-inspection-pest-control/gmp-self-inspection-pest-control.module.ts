import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPSelfInspectionPestControlReportAreaComponent } from './area/gmp.self.inspection.pest.control.area'
import { GMPSelfInspectionPestControlReportItemComponent } from './item/gmp.self.inspection.pest.control.item'
import { GMPSelfInspectionPestControlReportLoaderComponent } from './loader/gmp.self.inspection.pest.control.report.loader.component'
import { GMPSelfInspectionPestControlReportComponent } from './report/gmp.self.inspection.pest.control.report'
import { GMPSelfInspectionPestControlReportViewerComponent } from './viewer/gmp.self.inspection.pest.control.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-self-inspection-pest-control-report', url: '/report/gmp-self-inspection-pest-control', component: GMPSelfInspectionPestControlReportViewerComponent, data: { suffix: 'gmp-self-inspection-pest-control' } }

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
    GMPSelfInspectionPestControlReportViewerComponent,
    GMPSelfInspectionPestControlReportLoaderComponent,
    GMPSelfInspectionPestControlReportComponent,
    GMPSelfInspectionPestControlReportAreaComponent,
    GMPSelfInspectionPestControlReportItemComponent
  ],
  exports: [
    GMPSelfInspectionPestControlReportViewerComponent
  ]
})

export class GMPSelfInspectionPestControlReportModule { }
