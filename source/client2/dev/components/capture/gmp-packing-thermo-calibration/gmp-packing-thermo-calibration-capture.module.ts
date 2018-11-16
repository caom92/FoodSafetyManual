import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingThermoCalibrationLogModule } from '../../logs/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingThermoCalibrationReportModule } from '../../reports/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-report.module'
import { GMPPackingThermoCalibrationCaptureComponent } from './capture/gmp-packing-thermo-calibration-capture.component'
import { GMPPackingThermoCalibrationCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingThermoCalibrationCaptureRoutingModule,
    GMPPackingThermoCalibrationLogModule,
    GMPPackingThermoCalibrationReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingThermoCalibrationCaptureComponent
  ]
})

export class GMPPackingThermoCalibrationCaptureModule { }
