import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingCoolerCleaningReportAreaComponent } from './area/gap-packing-cooler-cleaning-report-area.component'
import { GAPPackingCoolerCleaningReportItemComponent } from './item/gap-packing-cooler-cleaning-report-item.component'
import { GAPPackingCoolerCleaningReportLoaderComponent } from './loader/gap-packing-cooler-cleaning-report-loader.component'
import { GAPPackingCoolerCleaningReportComponent } from './report/gap-packing-cooler-cleaning-report.component'
import { GAPPackingCoolerCleaningReportTypeComponent } from './type/gap-packing-cooler-cleaning-report-type.component'
import { GAPPackingCoolerCleaningReportViewerComponent } from './viewer/gap-packing-cooler-cleaning-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingCoolerCleaningReportViewerComponent,
    GAPPackingCoolerCleaningReportLoaderComponent,
    GAPPackingCoolerCleaningReportComponent,
    GAPPackingCoolerCleaningReportAreaComponent,
    GAPPackingCoolerCleaningReportTypeComponent,
    GAPPackingCoolerCleaningReportItemComponent
  ],
  exports: [
    GAPPackingCoolerCleaningReportViewerComponent
  ]
})

export class GAPPackingCoolerCleaningReportModule { }
