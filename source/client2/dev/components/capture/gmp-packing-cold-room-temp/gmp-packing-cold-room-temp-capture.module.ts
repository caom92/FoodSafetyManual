import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingColdRoomTempLogModule } from '../../logs/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingColdRoomTempReportModule } from '../../reports/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp.module'
import { GMPPackingColdRoomTempCaptureComponent } from './capture/gmp-packing-cold-room-temp-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-cold-room-temp-log', url: '/log/gmp-packing-cold-room-temp', component: GMPPackingColdRoomTempCaptureComponent, data: { suffix: 'gmp-packing-cold-room-temp' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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