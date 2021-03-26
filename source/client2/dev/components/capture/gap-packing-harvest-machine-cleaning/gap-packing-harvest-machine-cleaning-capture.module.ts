import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingHarvestMachineCleaningLogModule } from '../../logs/gap-packing-harvest-machine-cleaning/gap-packing-harvest-machine-cleaning-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingHarvestMachineCleaningReportModule } from '../../reports/gap-packing-harvest-machine-cleaning/gap-packing-harvest-machine-cleaning-report.module'
import { GAPPackingHarvestMachineCleaningCaptureComponent } from './capture/gap-packing-harvest-machine-cleaning-capture.component'
import { GAPPackingHarvestMachineCleaningCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingHarvestMachineCleaningCaptureRoutingModule,
    GAPPackingHarvestMachineCleaningLogModule,
    GAPPackingHarvestMachineCleaningReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestMachineCleaningCaptureComponent
  ]
})

export class GAPPackingHarvestMachineCleaningCaptureModule { }
