import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingPestControlInspectionExteriorLogList } from './log-list/gap-packing-pest-control-inspection-exterior-log-list.component'
import { GAPPackingPestControlInspectionExteriorLogComponent } from './log/gap-packing-pest-control-inspection-exterior-log.component'
import { GAPPackingPestControlInspectionExteriorItemComponent } from './item/gap-packing-pest-control-inspection-exterior-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPestControlInspectionExteriorLogComponent,
    GAPPackingPestControlInspectionExteriorItemComponent,
    GAPPackingPestControlInspectionExteriorLogList
  ],
  exports: [
    GAPPackingPestControlInspectionExteriorLogComponent,
    GAPPackingPestControlInspectionExteriorItemComponent,
    GAPPackingPestControlInspectionExteriorLogList
  ]
})

export class GAPPackingPestControlInspectionExteriorLogModule { }
