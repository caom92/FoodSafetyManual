import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingThermoCalibrationReportItemComponent } from './item/gmp.packing.thermo.calibration.report.item'
import { GMPPackingThermoCalibrationReportLoaderComponent } from './loader/gmp.packing.thermo.calibration.report.loader.component'
import { GMPPackingThermoCalibrationReportComponent } from './report/gmp.packing.thermo.calibration.report'
import { GMPPackingThermoCalibrationReportViewerComponent } from './viewer/gmp.packing.thermo.calibration.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingThermoCalibrationReportViewerComponent,
    GMPPackingThermoCalibrationReportLoaderComponent,
    GMPPackingThermoCalibrationReportComponent,
    GMPPackingThermoCalibrationReportItemComponent
  ],
  exports: [
    GMPPackingThermoCalibrationReportViewerComponent
  ]
})

export class GMPPackingThermoCalibrationReportModule { }
