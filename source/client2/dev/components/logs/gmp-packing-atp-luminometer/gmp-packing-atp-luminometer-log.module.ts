import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingATPLuminometerItemComponent } from './item/gmp.packing.atp.luminometer.item'
import { GMPPackingATPLuminometerLogList } from './log-list/gmp.packing.atp.luminometer.log.list'
import { GMPPackingATPLuminometerLogComponent } from './log/gmp.packing.atp.luminometer.log'
import { GMPPackingATPLuminometerTestComponent } from './test/gmp.packing.atp.luminometer.test'
import { GMPPackingATPLuminometerTypeComponent } from './type/gmp.packing.atp.luminometer.type'
import { GMPPackingATPLuminometerWeekComponent } from './week/gmp.packing.atp.luminometer.week'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPLuminometerLogList,
    GMPPackingATPLuminometerLogComponent,
    GMPPackingATPLuminometerItemComponent,
    GMPPackingATPLuminometerWeekComponent,
    GMPPackingATPLuminometerTypeComponent,
    GMPPackingATPLuminometerTestComponent
  ],
  exports: [
    GMPPackingATPLuminometerLogList,
    GMPPackingATPLuminometerLogComponent,
    GMPPackingATPLuminometerItemComponent,
    GMPPackingATPLuminometerWeekComponent,
    GMPPackingATPLuminometerTypeComponent,
    GMPPackingATPLuminometerTestComponent
  ]
})

export class GMPPackingATPLuminometerLogModule { }
