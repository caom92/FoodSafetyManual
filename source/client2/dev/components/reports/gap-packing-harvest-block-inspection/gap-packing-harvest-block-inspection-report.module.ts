import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingHarvestBlockInspectionReportCommentComponent } from './comment/gap-packing-harvest-block-inspection-report-comment.component'
import { GAPPackingHarvestBlockInspectionReportItemComponent } from './item/gap-packing-harvest-block-inspection-report-item.component'
import { GAPPackingHarvestBlockInspectionReportLoaderComponent } from './loader/gap-packing-harvest-block-inspection-report-loader.component'
import { GAPPackingHarvestBlockInspectionReportComponent } from './report/gap-packing-harvest-block-inspection-report.component'
import { GAPPackingHarvestBlockInspectionReportViewerComponent } from './viewer/gap-packing-harvest-block-inspection-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestBlockInspectionReportViewerComponent,
    GAPPackingHarvestBlockInspectionReportLoaderComponent,
    GAPPackingHarvestBlockInspectionReportComponent,
    GAPPackingHarvestBlockInspectionReportItemComponent,
    GAPPackingHarvestBlockInspectionReportCommentComponent
  ],
  exports: [
    GAPPackingHarvestBlockInspectionReportViewerComponent
  ]
})

export class GAPPackingHarvestBlockInspectionReportModule { }
