import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingCoolerCleaningLogModule } from '../../logs/gap-packing-cooler-cleaning/gap-packing-cooler-cleaning-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingCoolerCleaningReportModule } from '../../reports/gap-packing-cooler-cleaning/gap-packing-cooler-cleaning-report.module'
import { GAPPackingCoolerCleaningCaptureComponent } from './capture/gap-packing-cooler-cleaning-capture.component'
import { GAPPackingCoolerCleaningCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingCoolerCleaningCaptureRoutingModule,
    GAPPackingCoolerCleaningLogModule,
    GAPPackingCoolerCleaningReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingCoolerCleaningCaptureComponent
  ]
})

export class GAPPackingCoolerCleaningCaptureModule { }
