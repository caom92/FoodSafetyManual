import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingHarvestToolReportDayComponent } from './day/gap-packing-harvest-tool-report-day.component'
import { GAPPackingHarvestToolReportLoaderComponent } from './loader/gap-packing-harvest-tool-report-loader.component'
import { GAPPackingHarvestToolReportComponent } from './report/gap-packing-harvest-tool-report.component'
import { GAPPackingHarvestToolReportToolComponent } from './tool/gap-packing-harvest-tool-report-tool.component'
import { GAPPackingHarvestToolReportViewerComponent } from './viewer/gap-packing-harvest-tool-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestToolReportViewerComponent,
    GAPPackingHarvestToolReportLoaderComponent,
    GAPPackingHarvestToolReportComponent,
    GAPPackingHarvestToolReportDayComponent,
    GAPPackingHarvestToolReportToolComponent
  ],
  exports: [
    GAPPackingHarvestToolReportViewerComponent,
    GAPPackingHarvestToolReportDayComponent,
    GAPPackingHarvestToolReportToolComponent
  ]
})

export class GAPPackingHarvestToolReportModule { }
