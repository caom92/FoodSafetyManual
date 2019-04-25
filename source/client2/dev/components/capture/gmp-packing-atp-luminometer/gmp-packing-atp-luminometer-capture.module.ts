import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingATPLuminometerLogModule } from '../../logs/gmp-packing-atp-luminometer/gmp-packing-atp-luminometer-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingATPLuminometerReportModule } from '../../reports/gmp-packing-atp-luminometer/gmp-packing-atp-luminometer-report.module'
import { GMPPackingATPLuminometerCaptureComponent } from './capture/gmp-packing-atp-luminometer-capture.component'
import { GMPPackingATPLuminometerCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingATPLuminometerCaptureRoutingModule,
    GMPPackingATPLuminometerLogModule,
    GMPPackingATPLuminometerReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPLuminometerCaptureComponent
  ]
})

export class GMPPackingATPLuminometerCaptureModule { }
