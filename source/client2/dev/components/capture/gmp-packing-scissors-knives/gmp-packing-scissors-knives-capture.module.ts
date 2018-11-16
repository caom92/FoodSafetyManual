import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScissorsKnivesLogModule } from '../../logs/gmp-packing-scissors-knives/gmp-packing-scissors-knives-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingScissorsKnivesReportModule } from '../../reports/gmp-packing-scissors-knives/gmp-packing-scissors-knives-report.module'
import { GMPPackingScissorsKnivesCaptureComponent } from './capture/gmp-packing-scissors-knives-capture.component'
import { GMPPackingScissorsKnivesCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingScissorsKnivesCaptureRoutingModule,
    GMPPackingScissorsKnivesLogModule,
    GMPPackingScissorsKnivesReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScissorsKnivesCaptureComponent
  ]
})

export class GMPPackingScissorsKnivesCaptureModule { }
