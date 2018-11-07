import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingColdRoomTempItemComponent } from './item/gmp.packing.cold.room.temp.item'
import { GMPPackingColdRoomTempLogComponent } from './log/gmp.packing.cold.room.temp.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-cold-room-temp-capture', url: '/capture/gmp-packing-cold-room-temp', component: GMPPackingColdRoomTempLogComponent, data: { suffix: 'gmp-packing-cold-room-temp' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingColdRoomTempLogComponent,
    GMPPackingColdRoomTempItemComponent
  ],
  exports: [
    GMPPackingColdRoomTempLogComponent,
    GMPPackingColdRoomTempItemComponent
  ]
})

export class GMPPackingColdRoomTempLogModule { }