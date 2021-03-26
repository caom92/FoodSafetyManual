import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GAPPackingHarvestMachineCleaningReportLoaderComponent } from './loader/gap-packing-harvest-machine-cleaning-report-loader.component'
import { GAPPackingHarvestMachineCleaningReportMachineComponent } from './machine/gap-packing-harvest-machine-cleaning-report-machine.component'
import { GAPPackingHarvestMachineCleaningReportComponent } from './report/gap-packing-harvest-machine-cleaning-report.component'
import { GAPPackingHarvestMachineCleaningReportViewerComponent } from './viewer/gap-packing-harvest-machine-cleaning-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestMachineCleaningReportViewerComponent,
    GAPPackingHarvestMachineCleaningReportLoaderComponent,
    GAPPackingHarvestMachineCleaningReportComponent,
    GAPPackingHarvestMachineCleaningReportMachineComponent
  ],
  exports: [
    GAPPackingHarvestMachineCleaningReportViewerComponent
  ]
})

export class GAPPackingHarvestMachineCleaningReportModule { }
