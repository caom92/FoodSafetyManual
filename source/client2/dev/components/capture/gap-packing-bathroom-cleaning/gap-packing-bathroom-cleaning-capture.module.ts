import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingBathroomCleaningLogModule } from '../../logs/gap-packing-bathroom-cleaning/gap-packing-bathroom-cleaning-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingBathroomCleaningReportModule } from '../../reports/gap-packing-bathroom-cleaning/gap-packing-bathroom-cleaning-report.module'
import { GAPPackingBathroomCleaningCaptureComponent } from './capture/gap-packing-bathroom-cleaning-capture.component'
import { GAPPackingBathroomCleaningCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingBathroomCleaningCaptureRoutingModule,
    GAPPackingBathroomCleaningLogModule,
    GAPPackingBathroomCleaningReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingBathroomCleaningCaptureComponent
  ]
})

export class GAPPackingBathroomCleaningCaptureModule { }
