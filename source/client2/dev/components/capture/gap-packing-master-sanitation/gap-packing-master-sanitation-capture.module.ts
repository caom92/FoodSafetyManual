import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GAPPackingMasterSanitationLogModule } from '../../logs/gap-packing-master-sanitation/gap-packing-master-sanitation-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GAPPackingMasterSanitationReportModule } from '../../reports/gap-packing-master-sanitation/gap-packing-master-sanitation-report.module'
import { GAPPackingMasterSanitationCaptureComponent } from './capture/gap-packing-master-sanitation-capture.component'
import { GAPPackingMasterSanitationCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GAPPackingMasterSanitationCaptureRoutingModule,
    GAPPackingMasterSanitationLogModule,
    GAPPackingMasterSanitationReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GAPPackingMasterSanitationCaptureComponent
  ]
})

export class GAPPackingMasterSanitationCaptureModule { }
