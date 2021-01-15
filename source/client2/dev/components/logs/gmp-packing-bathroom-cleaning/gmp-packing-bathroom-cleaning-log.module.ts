import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingBathroomCleaningDayComponent } from './day/gmp-packing-bathroom-cleaning-day.component'
import { GMPPackingBathroomCleaningLogList } from './log-list/gmp-packing-bathroom-cleaning-log-list.component'
import { GMPPackingBathroomCleaningLogComponent } from './log/gmp-packing-bathroom-cleaning-log.component'
import { GMPPackingBathroomCleaningItemComponent } from './item/gmp-packing-bathroom-cleaning-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingBathroomCleaningLogComponent,
    GMPPackingBathroomCleaningDayComponent,
    GMPPackingBathroomCleaningItemComponent,
    GMPPackingBathroomCleaningLogList
  ],
  exports: [
    GMPPackingBathroomCleaningLogComponent,
    GMPPackingBathroomCleaningDayComponent,
    GMPPackingBathroomCleaningItemComponent,
    GMPPackingBathroomCleaningLogList
  ]
})

export class GMPPackingBathroomCleaningLogModule { }
