import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingATPTestingReportAreaComponent } from './entry/gmp.packing.atp.testing.entry'
import { GMPPackingATPTestingReportLoaderComponent } from './loader/gmp.packing.atp.testing.report.loader.component'
import { GMPPackingATPTestingReportComponent } from './report/gmp.packing.atp.testing.report'
import { GMPPackingATPTestingReportItemComponent } from './test/gmp.packing.atp.testing.test'
import { GMPPackingATPTestingReportViewerComponent } from './viewer/gmp.packing.atp.testing.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingATPTestingReportViewerComponent,
    GMPPackingATPTestingReportLoaderComponent,
    GMPPackingATPTestingReportComponent,
    GMPPackingATPTestingReportAreaComponent,
    GMPPackingATPTestingReportItemComponent
  ],
  exports: [
    GMPPackingATPTestingReportViewerComponent
  ]
})

export class GMPPackingATPTestingReportModule { }
