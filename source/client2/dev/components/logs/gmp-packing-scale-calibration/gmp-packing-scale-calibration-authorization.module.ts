import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScaleCalibrationAuthorizationComponent } from './authorization/gmp.packing.scale.calibration.authorization'
import { GMPPackingScaleCalibrationLogModule } from './gmp-packing-scale-calibration-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scale-calibration-authorization', url: '/authorizations/gmp-packing-scale-calibration/:report_id', component: GMPPackingScaleCalibrationAuthorizationComponent, data: { suffix: 'gmp-packing-scale-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPPackingScaleCalibrationLogModule
  ],
  declarations: [
    GMPPackingScaleCalibrationAuthorizationComponent
  ],
  exports: [
    GMPPackingScaleCalibrationAuthorizationComponent
  ]
})

export class GMPPackingScaleCalibrationAuthorizationModule { }