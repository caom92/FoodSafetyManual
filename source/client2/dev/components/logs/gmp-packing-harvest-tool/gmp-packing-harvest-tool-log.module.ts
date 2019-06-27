import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHarvestToolDayComponent } from './day/gmp-packing-harvest-tool-day.component'
import { GMPPackingHarvestToolLogList } from './log-list/gmp-packing-harvest-tool-log-list.component'
import { GMPPackingHarvestToolLogComponent } from './log/gmp-packing-harvest-tool-log.component'
import { GMPPackingHarvestToolTypeComponent } from './type/gmp-packing-harvest-tool-type.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHarvestToolLogComponent,
    GMPPackingHarvestToolDayComponent,
    GMPPackingHarvestToolTypeComponent,
    GMPPackingHarvestToolLogList
  ],
  exports: [
    GMPPackingHarvestToolLogComponent,
    GMPPackingHarvestToolDayComponent,
    GMPPackingHarvestToolTypeComponent,
    GMPPackingHarvestToolLogList
  ]
})

export class GMPPackingHarvestToolLogModule { }
