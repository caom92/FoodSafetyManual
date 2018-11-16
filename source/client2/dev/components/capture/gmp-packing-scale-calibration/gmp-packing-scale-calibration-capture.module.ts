import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScaleCalibrationLogModule } from '../../logs/gmp-packing-scale-calibration/gmp-packing-scale-calibration-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingScaleCalibrationReportModule } from '../../reports/gmp-packing-scale-calibration/gmp-packing-scale-calibration-report.module'
import { GMPPackingScaleCalibrationCaptureComponent } from './capture/gmp-packing-scale-calibration-capture.component'
import { GMPPackingScaleCalibrationCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingScaleCalibrationCaptureRoutingModule,
    GMPPackingScaleCalibrationLogModule,
    GMPPackingScaleCalibrationReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScaleCalibrationCaptureComponent
  ]
})

export class GMPPackingScaleCalibrationCaptureModule { }
