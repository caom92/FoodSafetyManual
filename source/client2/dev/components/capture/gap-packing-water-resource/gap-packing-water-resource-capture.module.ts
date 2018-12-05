import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingWaterResourceLogModule } from '../../logs/gap-packing-water-resource/gap-packing-water-resource-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingWaterResourceReportModule } from '../../reports/gap-packing-water-resource/gap-packing-water-resource-report.module'
import { GAPPackingWaterResourceCaptureComponent } from './capture/gap-packing-water-resource-capture.component'
import { GAPPackingWaterResourceCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingWaterResourceCaptureRoutingModule,
    GAPPackingWaterResourceLogModule,
    GAPPackingWaterResourceReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingWaterResourceCaptureComponent
  ]
})

export class GAPPackingWaterResourceCaptureModule { }
