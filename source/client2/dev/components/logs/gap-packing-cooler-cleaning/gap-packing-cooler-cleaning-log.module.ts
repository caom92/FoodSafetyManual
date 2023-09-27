import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingCoolerCleaningAreaComponent } from './area/gap-packing-cooler-cleaning-area.component'
import { GAPPackingCoolerCleaningItemComponent } from './item/gap-packing-cooler-cleaning-item.component'
import { GAPPackingCoolerCleaningLogList } from './log-list/gap-packing-cooler-cleaning-log-list.component'
import { GAPPackingCoolerCleaningLogComponent } from './log/gap-packing-cooler-cleaning-log.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingCoolerCleaningLogComponent,
    GAPPackingCoolerCleaningAreaComponent,
    GAPPackingCoolerCleaningItemComponent,
    GAPPackingCoolerCleaningLogList
  ],
  exports: [
    GAPPackingCoolerCleaningLogComponent,
    GAPPackingCoolerCleaningAreaComponent,
    GAPPackingCoolerCleaningItemComponent,
    GAPPackingCoolerCleaningLogList
  ]
})

export class GAPPackingCoolerCleaningLogModule { }
