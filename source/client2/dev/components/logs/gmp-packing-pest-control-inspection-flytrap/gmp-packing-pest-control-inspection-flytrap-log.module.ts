import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionFlytrapLogList } from './log-list/gmp-packing-pest-control-inspection-flytrap-log-list.component'
import { GMPPackingPestControlInspectionFlytrapLogComponent } from './log/gmp-packing-pest-control-inspection-flytrap-log.component'
import { GMPPackingPestControlInspectionFlytrapItemComponent } from './item/gmp-packing-pest-control-inspection-flytrap-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionFlytrapLogComponent,
    GMPPackingPestControlInspectionFlytrapItemComponent,
    GMPPackingPestControlInspectionFlytrapLogList
  ],
  exports: [
    GMPPackingPestControlInspectionFlytrapLogComponent,
    GMPPackingPestControlInspectionFlytrapItemComponent,
    GMPPackingPestControlInspectionFlytrapLogList
  ]
})

export class GMPPackingPestControlInspectionFlytrapLogModule { }
