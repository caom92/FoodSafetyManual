import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingOzoneWaterReportLoaderComponent } from './loader/gmp.packing.ozone.water.report.loader.component'
import { GMPPackingOzoneWaterReportComponent } from './report/gmp.packing.ozone.water.report'
import { GMPPackingOzoneWaterReportViewerComponent } from './viewer/gmp.packing.ozone.water.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-ozone-water-report', url: '/report/gmp-packing-ozone-water', component: GMPPackingOzoneWaterReportViewerComponent, data: { suffix: 'gmp-packing-ozone-water' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [reportState] }),
    ReportCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterReportViewerComponent,
    GMPPackingOzoneWaterReportLoaderComponent,
    GMPPackingOzoneWaterReportComponent
  ],
  exports: [
    GMPPackingOzoneWaterReportViewerComponent
  ]
})

export class GMPPackingOzoneWaterReportModule { }
