import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingPreopReportAreaComponent } from './area/gap.packing.preop.report.area'
import { GAPPackingPreopReportItemComponent } from './item/gap.packing.preop.report.item'
import { GAPPackingPreopReportLoaderComponent } from './loader/gap.packing.preop.report.loader.component'
import { GAPPackingPreopReportComponent } from './report/gap.packing.preop.report'
import { GAPPackingPreopReportTypeComponent } from './type/gap.packing.preop.report.type'
import { GAPPackingPreopReportViewerComponent } from './viewer/gap.packing.preop.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPreopReportViewerComponent,
    GAPPackingPreopReportLoaderComponent,
    GAPPackingPreopReportComponent,
    GAPPackingPreopReportAreaComponent,
    GAPPackingPreopReportTypeComponent,
    GAPPackingPreopReportItemComponent
  ],
  exports: [
    GAPPackingPreopReportViewerComponent
  ]
})

export class GAPPackingPreopReportModule { }