import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingScissorsKnivesReportItemComponent } from './item/gmp.packing.scissors.knives.report.item'
import { GMPPackingScissorsKnivesReportLoaderComponent } from './loader/gmp.packing.scissors.knives.report.loader.component'
import { GMPPackingScissorsKnivesReportComponent } from './report/gmp.packing.scissors.knives.report'
import { GMPPackingScissorsKnivesReportViewerComponent } from './viewer/gmp.packing.scissors.knives.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
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
