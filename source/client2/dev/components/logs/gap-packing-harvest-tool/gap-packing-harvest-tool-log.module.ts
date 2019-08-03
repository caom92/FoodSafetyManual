import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestToolDayComponent } from './day/gap-packing-harvest-tool-day.component'
import { GAPPackingHarvestToolLogList } from './log-list/gap-packing-harvest-tool-log-list.component'
import { GAPPackingHarvestToolLogComponent } from './log/gap-packing-harvest-tool-log.component'
import { GAPPackingHarvestToolToolComponent } from './tool/gap-packing-harvest-tool-tool.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestToolLogComponent,
    GAPPackingHarvestToolDayComponent,
    GAPPackingHarvestToolToolComponent,
    GAPPackingHarvestToolLogList
  ],
  exports: [
    GAPPackingHarvestToolLogComponent,
    GAPPackingHarvestToolDayComponent,
    GAPPackingHarvestToolToolComponent,
    GAPPackingHarvestToolLogList
  ]
})

export class GAPPackingHarvestToolLogModule { }
