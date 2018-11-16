import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingPreopLogModule } from '../../logs/gap-packing-preop/gap-packing-preop-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingPreopReportModule } from '../../reports/gap-packing-preop/gap-packing-preop-report.module'
import { GAPPackingPreopCaptureComponent } from './capture/gap-packing-preop-capture.component'
import { GAPPackingPreopCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingPreopCaptureRoutingModule,
    GAPPackingPreopLogModule,
    GAPPackingPreopReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingPreopCaptureComponent
  ]
})

export class GAPPackingPreopCaptureModule { }
