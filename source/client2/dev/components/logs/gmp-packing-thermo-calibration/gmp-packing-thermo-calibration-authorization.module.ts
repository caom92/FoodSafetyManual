import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingThermoCalibrationAuthorizationComponent } from './authorization/gmp.packing.thermo.calibration.authorization'
import { GMPPackingThermoCalibrationLogModule } from './gmp-packing-thermo-calibration-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-thermo-calibration-authorization', url: '/authorizations/gmp-packing-thermo-calibration/:report_id', component: GMPPackingThermoCalibrationAuthorizationComponent, data: { suffix: 'gmp-packing-thermo-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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