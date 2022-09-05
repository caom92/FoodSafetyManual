import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionInteriorLogList } from './log-list/gap-packing-pest-control-inspection-interior-log-list.component'
import { GAPPackingPestControlInspectionInteriorLogComponent } from './log/gap-packing-pest-control-inspection-interior-log.component'
import { GAPPackingPestControlInspectionInteriorItemComponent } from './item/gap-packing-pest-control-inspection-interior-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionInteriorLogComponent,
    GAPPackingPestControlInspectionInteriorItemComponent,
    GAPPackingPestControlInspectionInteriorLogList
  ],
  exports: [
    GAPPackingPestControlInspectionInteriorLogComponent,
    GAPPackingPestControlInspectionInteriorItemComponent,
    GAPPackingPestControlInspectionInteriorLogList
  ]
})

export class GAPPackingPestControlInspectionInteriorLogModule { }
