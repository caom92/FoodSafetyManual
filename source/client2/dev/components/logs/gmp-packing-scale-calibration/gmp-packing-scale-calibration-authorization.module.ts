import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScaleCalibrationAuthorizationComponent } from './authorization/gmp.packing.scale.calibration.authorization'
import { GMPPackingScaleCalibrationLogModule } from './gmp-packing-scale-calibration-log.module'
import { GMPPackingScaleCalibrationAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingScaleCalibrationAuthorizationRoutingModule,
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
