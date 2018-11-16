import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingColdRoomTempLogModule } from '../../logs/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingColdRoomTempReportModule } from '../../reports/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-report.module'
import { GMPPackingColdRoomTempCaptureComponent } from './capture/gmp-packing-cold-room-temp-capture.component'
import { GMPPackingColdRoomTempCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingColdRoomTempCaptureRoutingModule,
    GMPPackingColdRoomTempLogModule,
    GMPPackingColdRoomTempReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingColdRoomTempCaptureComponent
  ]
})

export class GMPPackingColdRoomTempCaptureModule { }
