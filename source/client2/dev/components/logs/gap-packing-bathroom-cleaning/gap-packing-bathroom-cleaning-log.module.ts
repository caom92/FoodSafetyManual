import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingBathroomCleaningDayComponent } from './day/gap-packing-bathroom-cleaning-day.component'
import { GAPPackingBathroomCleaningLogList } from './log-list/gap-packing-bathroom-cleaning-log-list.component'
import { GAPPackingBathroomCleaningLogComponent } from './log/gap-packing-bathroom-cleaning-log.component'
import { GAPPackingBathroomCleaningItemComponent } from './item/gap-packing-bathroom-cleaning-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingBathroomCleaningLogComponent,
    GAPPackingBathroomCleaningDayComponent,
    GAPPackingBathroomCleaningItemComponent,
    GAPPackingBathroomCleaningLogList
  ],
  exports: [
    GAPPackingBathroomCleaningLogComponent,
    GAPPackingBathroomCleaningDayComponent,
    GAPPackingBathroomCleaningItemComponent,
    GAPPackingBathroomCleaningLogList
  ]
})

export class GAPPackingBathroomCleaningLogModule { }
