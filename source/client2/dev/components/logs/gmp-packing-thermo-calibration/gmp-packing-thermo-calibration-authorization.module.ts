import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingThermoCalibrationAuthorizationComponent } from './authorization/gmp.packing.thermo.calibration.authorization'
import { GMPPackingThermoCalibrationLogModule } from './gmp-packing-thermo-calibration-log.module'
import { GMPPackingThermoCalibrationAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingThermoCalibrationAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingThermoCalibrationLogModule
  ],
  declarations: [
    GMPPackingThermoCalibrationAuthorizationComponent
  ],
  exports: [
    GMPPackingThermoCalibrationAuthorizationComponent
  ]
})

export class GMPPackingThermoCalibrationAuthorizationModule { }
