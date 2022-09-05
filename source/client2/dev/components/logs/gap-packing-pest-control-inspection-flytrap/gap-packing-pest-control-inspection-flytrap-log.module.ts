import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionFlytrapLogList } from './log-list/gap-packing-pest-control-inspection-flytrap-log-list.component'
import { GAPPackingPestControlInspectionFlytrapLogComponent } from './log/gap-packing-pest-control-inspection-flytrap-log.component'
import { GAPPackingPestControlInspectionFlytrapItemComponent } from './item/gap-packing-pest-control-inspection-flytrap-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionFlytrapLogComponent,
    GAPPackingPestControlInspectionFlytrapItemComponent,
    GAPPackingPestControlInspectionFlytrapLogList
  ],
  exports: [
    GAPPackingPestControlInspectionFlytrapLogComponent,
    GAPPackingPestControlInspectionFlytrapItemComponent,
    GAPPackingPestControlInspectionFlytrapLogList
  ]
})

export class GAPPackingPestControlInspectionFlytrapLogModule { }
