import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingColdRoomTempItemComponent } from './item/gmp.packing.cold.room.temp.item'
import { GMPPackingColdRoomTempLogComponent } from './log/gmp.packing.cold.room.temp.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
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
