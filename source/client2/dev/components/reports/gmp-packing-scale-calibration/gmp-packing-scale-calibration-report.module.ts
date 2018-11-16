import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingScaleCalibrationReportItemComponent } from './item/gmp.packing.scale.calibration.report.item'
import { GMPPackingScaleCalibrationReportLoaderComponent } from './loader/gmp.packing.scale.calibration.report.loader.component'
import { GMPPackingScaleCalibrationReportComponent } from './report/gmp.packing.scale.calibration.report'
import { GMPPackingScaleCalibrationReportTypeComponent } from './type/gmp.packing.scale.calibration.report.type'
import { GMPPackingScaleCalibrationReportViewerComponent } from './viewer/gmp.packing.scale.calibration.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingScaleCalibrationReportViewerComponent,
    GMPPackingScaleCalibrationReportLoaderComponent,
    GMPPackingScaleCalibrationReportComponent,
    GMPPackingScaleCalibrationReportTypeComponent,
    GMPPackingScaleCalibrationReportItemComponent
  ],
  exports: [
    GMPPackingScaleCalibrationReportViewerComponent
  ]
})

export class GMPPackingScaleCalibrationReportModule { }
