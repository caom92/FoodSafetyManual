import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingColdRoomTempAuthorizationComponent } from './authorization/gmp.packing.cold.room.temp.authorization'
import { GMPPackingColdRoomTempLogModule } from './gmp-packing-cold-room-temp-log.module'
import { GMPPackingColdRoomTempAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingColdRoomTempAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingColdRoomTempLogModule
  ],
  declarations: [
    GMPPackingColdRoomTempAuthorizationComponent
  ],
  exports: [
    GMPPackingColdRoomTempAuthorizationComponent
  ]
})

export class GMPPackingColdRoomTempAuthorizationModule { }
