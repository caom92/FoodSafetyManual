import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingPestControlInspectionExteriorLogModule } from '../../logs/gmp-packing-pest-control-inspection-exterior/gmp-packing-pest-control-inspection-exterior-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingPestControlInspectionExteriorReportModule } from '../../reports/gmp-packing-pest-control-inspection-exterior/gmp-packing-pest-control-inspection-exterior-report.module'
import { GMPPackingPestControlInspectionExteriorCaptureComponent } from './capture/gmp-packing-pest-control-inspection-exterior-capture.component'
import { GMPPackingPestControlInspectionExteriorCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingPestControlInspectionExteriorCaptureRoutingModule,
    GMPPackingPestControlInspectionExteriorLogModule,
    GMPPackingPestControlInspectionExteriorReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPestControlInspectionExteriorCaptureComponent
  ]
})

export class GMPPackingPestControlInspectionExteriorCaptureModule { }
