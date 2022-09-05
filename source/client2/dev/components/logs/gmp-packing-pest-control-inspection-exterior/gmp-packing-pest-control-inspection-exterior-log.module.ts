import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPestControlInspectionExteriorLogList } from './log-list/gmp-packing-pest-control-inspection-exterior-log-list.component'
import { GMPPackingPestControlInspectionExteriorLogComponent } from './log/gmp-packing-pest-control-inspection-exterior-log.component'
import { GMPPackingPestControlInspectionExteriorItemComponent } from './item/gmp-packing-pest-control-inspection-exterior-item.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionExteriorLogComponent,
    GMPPackingPestControlInspectionExteriorItemComponent,
    GMPPackingPestControlInspectionExteriorLogList
  ],
  exports: [
    GMPPackingPestControlInspectionExteriorLogComponent,
    GMPPackingPestControlInspectionExteriorItemComponent,
    GMPPackingPestControlInspectionExteriorLogList
  ]
})

export class GMPPackingPestControlInspectionExteriorLogModule { }
