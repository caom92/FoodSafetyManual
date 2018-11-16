import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPreopLogModule } from '../../logs/gmp-packing-preop/gmp-packing-preop-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingPreopReportModule } from '../../reports/gmp-packing-preop/gmp-packing-preop-report.module'
import { GMPPackingPreopCaptureComponent } from './capture/gmp-packing-preop-capture.component'
import { GMPPackingPreopCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingPreopCaptureRoutingModule,
    GMPPackingPreopLogModule,
    GMPPackingPreopReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPreopCaptureComponent
  ]
})

export class GMPPackingPreopCaptureModule { }
