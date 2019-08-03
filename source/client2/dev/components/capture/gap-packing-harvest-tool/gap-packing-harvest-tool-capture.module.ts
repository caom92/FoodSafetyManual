import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingHarvestToolLogModule } from '../../logs/gap-packing-harvest-tool/gap-packing-harvest-tool-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingHarvestToolReportModule } from '../../reports/gap-packing-harvest-tool/gap-packing-harvest-tool-report.module'
import { GAPPackingHarvestToolCaptureComponent } from './capture/gap-packing-harvest-tool-capture.component'
import { GAPPackingHarvestToolCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingHarvestToolCaptureRoutingModule,
    GAPPackingHarvestToolLogModule,
    GAPPackingHarvestToolReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestToolCaptureComponent
  ]
})

export class GAPPackingHarvestToolCaptureModule { }
