import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingHarvestBlockInspectionLogModule } from '../../logs/gap-packing-harvest-block-inspection/gap-packing-harvest-block-inspection-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingHarvestBlockInspectionReportModule } from '../../reports/gap-packing-harvest-block-inspection/gap-packing-harvest-block-inspection-report.module'
import { GAPPackingHarvestBlockInspectionCaptureComponent } from './capture/gap-packing-harvest-block-inspection-capture.component'
import { GAPPackingHarvestBlockInspectionCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingHarvestBlockInspectionCaptureRoutingModule,
    GAPPackingHarvestBlockInspectionLogModule,
    GAPPackingHarvestBlockInspectionReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingHarvestBlockInspectionCaptureComponent
  ]
})

export class GAPPackingHarvestBlockInspectionCaptureModule { }
