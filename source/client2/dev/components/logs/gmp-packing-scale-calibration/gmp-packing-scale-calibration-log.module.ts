import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingScaleCalibrationItemComponent } from './item/gmp.packing.scale.calibration.item'
import { GMPPackingScaleCalibrationLogComponent } from './log/gmp.packing.scale.calibration.log'
import { GMPPackingScaleCalibrationTypeComponent } from './type/gmp.packing.scale.calibration.type'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scale-calibration-capture', url: '/capture/gmp-packing-scale-calibration', component: GMPPackingScaleCalibrationLogComponent, data: { suffix: 'gmp-packing-scale-calibration' } }

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
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScaleCalibrationTypeComponent,
    GMPPackingScaleCalibrationItemComponent
  ],
  exports: [
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScaleCalibrationTypeComponent,
    GMPPackingScaleCalibrationItemComponent
  ]
})

export class GMPPackingScaleCalibrationLogModule { }