import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingThermoCalibrationItemComponent } from './item/gmp.packing.thermo.calibration.item'
import { GMPPackingThermoCalibrationLogComponent } from './log/gmp.packing.thermo.calibration.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingThermoCalibrationItemComponent
  ],
  exports: [
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingThermoCalibrationItemComponent
  ]
})

export class GMPPackingThermoCalibrationLogModule { }
