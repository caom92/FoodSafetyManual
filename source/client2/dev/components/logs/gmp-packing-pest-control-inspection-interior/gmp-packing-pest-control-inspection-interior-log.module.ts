import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionInteriorLogList } from './log-list/gmp-packing-pest-control-inspection-interior-log-list.component'
import { GMPPackingPestControlInspectionInteriorLogComponent } from './log/gmp-packing-pest-control-inspection-interior-log.component'
import { GMPPackingPestControlInspectionInteriorItemComponent } from './item/gmp-packing-pest-control-inspection-interior-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionInteriorLogComponent,
    GMPPackingPestControlInspectionInteriorItemComponent,
    GMPPackingPestControlInspectionInteriorLogList
  ],
  exports: [
    GMPPackingPestControlInspectionInteriorLogComponent,
    GMPPackingPestControlInspectionInteriorItemComponent,
    GMPPackingPestControlInspectionInteriorLogList
  ]
})

export class GMPPackingPestControlInspectionInteriorLogModule { }
