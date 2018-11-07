import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingColdRoomTempAuthorizationComponent } from './authorization/gmp.packing.cold.room.temp.authorization'
import { GMPPackingColdRoomTempLogModule } from './gmp-packing-cold-room-temp-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-cold-room-temp-authorization', url: '/authorizations/gmp-packing-cold-room-temp/:report_id', component: GMPPackingColdRoomTempAuthorizationComponent, data: { suffix: 'gmp-packing-cold-room-temp' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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