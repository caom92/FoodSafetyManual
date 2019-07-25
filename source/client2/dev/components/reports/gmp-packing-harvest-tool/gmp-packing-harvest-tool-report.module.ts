import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingHarvestToolReportDayComponent } from './day/gmp-packing-harvest-tool-report-day.component'
import { GMPPackingHarvestToolReportLoaderComponent } from './loader/gmp-packing-harvest-tool-report-loader.component'
import { GMPPackingHarvestToolReportComponent } from './report/gmp-packing-harvest-tool-report.component'
import { GMPPackingHarvestToolReportToolComponent } from './tool/gmp-packing-harvest-tool-report-tool.component'
import { GMPPackingHarvestToolReportViewerComponent } from './viewer/gmp-packing-harvest-tool-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHarvestToolReportViewerComponent,
    GMPPackingHarvestToolReportLoaderComponent,
    GMPPackingHarvestToolReportComponent,
    GMPPackingHarvestToolReportDayComponent,
    GMPPackingHarvestToolReportToolComponent
  ],
  exports: [
    GMPPackingHarvestToolReportViewerComponent,
    GMPPackingHarvestToolReportDayComponent,
    GMPPackingHarvestToolReportToolComponent
  ]
})

export class GMPPackingHarvestToolReportModule { }
