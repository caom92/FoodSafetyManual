import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingATPLuminometerReportItemComponent } from './item/gmp.packing.atp.luminometer.report.item'
import { GMPPackingATPLuminometerReportLoaderComponent } from './loader/gmp.packing.atp.luminometer.report.loader.component'
import { GMPPackingATPLuminometerReportComponent } from './report/gmp.packing.atp.luminometer.report'
import { GMPPackingATPLuminometerReportTestComponent } from './test/gmp.packing.atp.luminometer.report.test'
import { GMPPackingATPLuminometerReportTypeComponent } from './type/gmp.packing.atp.luminometer.report.type'
import { GMPPackingATPLuminometerReportViewerComponent } from './viewer/gmp.packing.atp.luminometer.report.viewer.component'
import { GMPPackingATPLuminometerReportWeekComponent } from './week/gmp.packing.atp.luminometer.report.week'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPLuminometerReportViewerComponent,
    GMPPackingATPLuminometerReportLoaderComponent,
    GMPPackingATPLuminometerReportComponent,
    GMPPackingATPLuminometerReportItemComponent,
    GMPPackingATPLuminometerReportWeekComponent,
    GMPPackingATPLuminometerReportTypeComponent,
    GMPPackingATPLuminometerReportTestComponent
  ],
  exports: [
    GMPPackingATPLuminometerReportViewerComponent
  ]
})

export class GMPPackingATPLuminometerReportModule { }
