import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPSelfInspectionPestControlReportAreaComponent } from './area/gap.self.inspection.pest.control.area'
import { GAPSelfInspectionPestControlReportItemComponent } from './item/gap.self.inspection.pest.control.item'
import { GAPSelfInspectionPestControlReportLoaderComponent } from './loader/gap.self.inspection.pest.control.report.loader.component'
import { GAPSelfInspectionPestControlReportComponent } from './report/gap.self.inspection.pest.control.report'
import { GAPSelfInspectionPestControlReportViewerComponent } from './viewer/gap.self.inspection.pest.control.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPSelfInspectionPestControlReportViewerComponent,
    GAPSelfInspectionPestControlReportLoaderComponent,
    GAPSelfInspectionPestControlReportComponent,
    GAPSelfInspectionPestControlReportAreaComponent,
    GAPSelfInspectionPestControlReportItemComponent
  ],
  exports: [
    GAPSelfInspectionPestControlReportViewerComponent
  ]
})

export class GAPSelfInspectionPestControlReportModule { }
