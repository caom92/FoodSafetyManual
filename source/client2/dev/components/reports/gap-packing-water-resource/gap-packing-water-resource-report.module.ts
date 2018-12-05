import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingWaterResourceReportAreaComponent } from './area/gap.packing.water.resource.report.area'
import { GAPPackingWaterResourceReportItemComponent } from './item/gap.packing.water.resource.report.item'
import { GAPPackingWaterResourceReportLoaderComponent } from './loader/gap.packing.water.resource.report.loader.component'
import { GAPPackingWaterResourceReportComponent } from './report/gap.packing.water.resource.report'
import { GAPPackingWaterResourceReportViewerComponent } from './viewer/gap.packing.water.resource.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingWaterResourceReportViewerComponent,
    GAPPackingWaterResourceReportLoaderComponent,
    GAPPackingWaterResourceReportComponent,
    GAPPackingWaterResourceReportAreaComponent,
    GAPPackingWaterResourceReportItemComponent
  ],
  exports: [
    GAPPackingWaterResourceReportViewerComponent
  ]
})

export class GAPPackingWaterResourceReportModule { }
