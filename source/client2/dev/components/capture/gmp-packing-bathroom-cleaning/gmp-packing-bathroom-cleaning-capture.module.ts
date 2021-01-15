import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingBathroomCleaningLogModule } from '../../logs/gmp-packing-bathroom-cleaning/gmp-packing-bathroom-cleaning-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingBathroomCleaningReportModule } from '../../reports/gmp-packing-bathroom-cleaning/gmp-packing-bathroom-cleaning-report.module'
import { GMPPackingBathroomCleaningCaptureComponent } from './capture/gmp-packing-bathroom-cleaning-capture.component'
import { GMPPackingBathroomCleaningCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingBathroomCleaningCaptureRoutingModule,
    GMPPackingBathroomCleaningLogModule,
    GMPPackingBathroomCleaningReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingBathroomCleaningCaptureComponent
  ]
})

export class GMPPackingBathroomCleaningCaptureModule { }
