import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingThermoCalibrationLogModule } from '../../logs/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingThermoCalibrationReportModule } from '../../reports/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration.module'
import { GMPPackingThermoCalibrationCaptureComponent } from './capture/gmp-packing-thermo-calibration-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-thermo-calibration-log', url: '/log/gmp-packing-thermo-calibration', component: GMPPackingThermoCalibrationCaptureComponent, data: { suffix: 'gmp-packing-thermo-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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