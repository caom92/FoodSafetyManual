import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHandWashingLogModule } from '../../logs/gmp-packing-hand-washing/gmp-packing-hand-washing-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingHandWashingReportModule } from '../../reports/gmp-packing-hand-washing/gmp-packing-hand-washing-report.module'
import { GMPPackingHandWashingCaptureComponent } from './capture/gmp-packing-hand-washing-capture.component'
import { GMPPackingHandWashingCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingHandWashingCaptureRoutingModule,
    GMPPackingHandWashingLogModule,
    GMPPackingHandWashingReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHandWashingCaptureComponent
  ]
})

export class GMPPackingHandWashingCaptureModule { }
