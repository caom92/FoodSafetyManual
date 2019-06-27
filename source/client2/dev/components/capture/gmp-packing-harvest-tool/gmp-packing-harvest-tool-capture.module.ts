import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingHarvestToolLogModule } from '../../logs/gmp-packing-harvest-tool/gmp-packing-harvest-tool-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingHarvestToolReportModule } from '../../reports/gmp-packing-harvest-tool/gmp-packing-harvest-tool-report.module'
import { GMPPackingHarvestToolCaptureComponent } from './capture/gmp-packing-harvest-tool-capture.component'
import { GMPPackingHarvestToolCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingHarvestToolCaptureRoutingModule,
    GMPPackingHarvestToolLogModule,
    GMPPackingHarvestToolReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHarvestToolCaptureComponent
  ]
})

export class GMPPackingHarvestToolCaptureModule { }
