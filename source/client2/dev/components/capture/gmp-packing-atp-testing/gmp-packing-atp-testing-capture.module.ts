import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingATPTestingLogModule } from '../../logs/gmp-packing-atp-testing/gmp-packing-atp-testing-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingATPTestingReportModule } from '../../reports/gmp-packing-atp-testing/gmp-packing-atp-testing-report.module'
import { GMPPackingATPTestingCaptureComponent } from './capture/gmp-packing-atp-testing-capture.component'
import { GMPPackingATPTestingCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingATPTestingCaptureRoutingModule,
    GMPPackingATPTestingLogModule,
    GMPPackingATPTestingReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPTestingCaptureComponent
  ]
})

export class GMPPackingATPTestingCaptureModule { }
