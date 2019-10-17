import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestBlockInspectionItemComponent } from './item/gap-packing-harvest-block-inspection-item.component'
import { GAPPackingHarvestBlockInspectionLogList } from './log-list/gap-packing-harvest-block-inspection-log-list.component'
import { GAPPackingHarvestBlockInspectionLogComponent } from './log/gap-packing-harvest-block-inspection-log.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestBlockInspectionLogComponent,
    GAPPackingHarvestBlockInspectionItemComponent,
    GAPPackingHarvestBlockInspectionLogList
  ],
  exports: [
    GAPPackingHarvestBlockInspectionLogComponent,
    GAPPackingHarvestBlockInspectionItemComponent,
    GAPPackingHarvestBlockInspectionLogList
  ]
})

export class GAPPackingHarvestBlockInspectionLogModule { }
