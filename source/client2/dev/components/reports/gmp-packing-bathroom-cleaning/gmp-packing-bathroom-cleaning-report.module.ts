import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingBathroomCleaningReportDayComponent } from './day/gmp-packing-bathroom-cleaning-report-day.component'
import { GMPPackingBathroomCleaningReportLoaderComponent } from './loader/gmp-packing-bathroom-cleaning-report-loader.component'
import { GMPPackingBathroomCleaningReportComponent } from './report/gmp-packing-bathroom-cleaning-report.component'
import { GMPPackingBathroomCleaningReportItemComponent } from './item/gmp-packing-bathroom-cleaning-report-item.component'
import { GMPPackingBathroomCleaningReportViewerComponent } from './viewer/gmp-packing-bathroom-cleaning-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingBathroomCleaningReportViewerComponent,
    GMPPackingBathroomCleaningReportLoaderComponent,
    GMPPackingBathroomCleaningReportComponent,
    GMPPackingBathroomCleaningReportDayComponent,
    GMPPackingBathroomCleaningReportItemComponent
  ],
  exports: [
    GMPPackingBathroomCleaningReportViewerComponent,
    GMPPackingBathroomCleaningReportDayComponent,
    GMPPackingBathroomCleaningReportItemComponent
  ]
})

export class GMPPackingBathroomCleaningReportModule { }
