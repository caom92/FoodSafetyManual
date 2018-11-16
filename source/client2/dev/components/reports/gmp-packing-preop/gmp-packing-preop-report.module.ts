import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingPreopReportAreaComponent } from './area/gmp.packing.preop.area'
import { GMPPackingPreopReportItemComponent } from './item/gmp.packing.preop.item'
import { GMPPackingPreopReportLoaderComponent } from './loader/gmp.packing.preop.report.loader.component'
import { GMPPackingPreopReportComponent } from './report/gmp.packing.preop.report'
import { GMPPackingPreopReportTypeComponent } from './type/gmp.packing.preop.type'
import { GMPPackingPreopReportViewerComponent } from './viewer/gmp.packing.preop.report.viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingPreopReportViewerComponent,
    GMPPackingPreopReportLoaderComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent
  ],
  exports: [
    GMPPackingPreopReportViewerComponent
  ]
})

export class GMPPackingPreopReportModule { }
