import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingOzoneWaterItemComponent } from './item/gmp.packing.ozone.water.item'
import { GMPPackingOzoneWaterLogList } from './log-list/gmp.packing.ozone.water.log.list'
import { GMPPackingOzoneWaterLogComponent } from './log/gmp.packing.ozone.water.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterLogList,
    GMPPackingOzoneWaterLogComponent,
    GMPPackingOzoneWaterItemComponent
  ],
  exports: [
    GMPPackingOzoneWaterLogList,
    GMPPackingOzoneWaterLogComponent,
    GMPPackingOzoneWaterItemComponent
  ]
})

export class GMPPackingOzoneWaterLogModule { }
