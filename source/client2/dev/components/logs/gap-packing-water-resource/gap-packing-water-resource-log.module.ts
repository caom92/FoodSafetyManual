import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingWaterResourceAreaComponent } from './area/gap.packing.water.resource.area'
import { GAPPackingWaterResourceItemComponent } from './item/gap.packing.water.resource.item'
import { GAPPackingWaterResourceLogList } from './log-list/gap.packing.water.resource.log.list'
import { GAPPackingWaterResourceLogComponent } from './log/gap.packing.water.resource.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingWaterResourceLogList,
    GAPPackingWaterResourceLogComponent,
    GAPPackingWaterResourceAreaComponent,
    GAPPackingWaterResourceItemComponent
  ],
  exports: [
    GAPPackingWaterResourceLogList,
    GAPPackingWaterResourceLogComponent,
    GAPPackingWaterResourceAreaComponent,
    GAPPackingWaterResourceItemComponent
  ]
})

export class GAPPackingWaterResourceLogModule { }
