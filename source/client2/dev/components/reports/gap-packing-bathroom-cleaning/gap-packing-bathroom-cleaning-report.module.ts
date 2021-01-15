import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingBathroomCleaningReportDayComponent } from './day/gap-packing-bathroom-cleaning-report-day.component'
import { GAPPackingBathroomCleaningReportLoaderComponent } from './loader/gap-packing-bathroom-cleaning-report-loader.component'
import { GAPPackingBathroomCleaningReportComponent } from './report/gap-packing-bathroom-cleaning-report.component'
import { GAPPackingBathroomCleaningReportItemComponent } from './item/gap-packing-bathroom-cleaning-report-item.component'
import { GAPPackingBathroomCleaningReportViewerComponent } from './viewer/gap-packing-bathroom-cleaning-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingBathroomCleaningReportViewerComponent,
    GAPPackingBathroomCleaningReportLoaderComponent,
    GAPPackingBathroomCleaningReportComponent,
    GAPPackingBathroomCleaningReportDayComponent,
    GAPPackingBathroomCleaningReportItemComponent
  ],
  exports: [
    GAPPackingBathroomCleaningReportViewerComponent,
    GAPPackingBathroomCleaningReportDayComponent,
    GAPPackingBathroomCleaningReportItemComponent
  ]
})

export class GAPPackingBathroomCleaningReportModule { }
