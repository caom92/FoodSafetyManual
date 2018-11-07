import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingThermoCalibrationItemComponent } from './item/gmp.packing.thermo.calibration.item'
import { GMPPackingThermoCalibrationLogComponent } from './log/gmp.packing.thermo.calibration.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-thermo-calibration-capture', url: '/capture/gmp-packing-thermo-calibration', component: GMPPackingThermoCalibrationLogComponent, data: { suffix: 'gmp-packing-thermo-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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