import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingScaleCalibrationLogModule } from '../../logs/gmp-packing-scale-calibration/gmp-packing-scale-calibration-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingScaleCalibrationReportModule } from '../../reports/gmp-packing-scale-calibration/gmp-packing-scale-calibration.module'
import { GMPPackingScaleCalibrationCaptureComponent } from './capture/gmp-packing-scale-calibration-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-scale-calibration-log', url: '/log/gmp-packing-scale-calibration', component: GMPPackingScaleCalibrationCaptureComponent, data: { suffix: 'gmp-packing-scale-calibration' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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