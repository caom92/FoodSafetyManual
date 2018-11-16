import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingOzoneWaterLogModule } from '../../logs/gmp-packing-ozone-water/gmp-packing-ozone-water-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingOzoneWaterReportModule } from '../../reports/gmp-packing-ozone-water/gmp-packing-ozone-water-report.module'
import { GMPPackingOzoneWaterCaptureComponent } from './capture/gmp-packing-ozone-water-capture.component'
import { GMPPackingOzoneWaterCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingOzoneWaterCaptureRoutingModule,
    GMPPackingOzoneWaterLogModule,
    GMPPackingOzoneWaterReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterCaptureComponent
  ]
})

export class GMPPackingOzoneWaterCaptureModule { }
