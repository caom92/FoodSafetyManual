import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingColdRoomTempReportItemComponent } from './item/gmp.packing.cold.room.temp.report.item'
import { GMPPackingColdRoomTempReportLoaderComponent } from './loader/gmp.packing.cold.room.temp.report.loader.component'
import { GMPPackingColdRoomTempReportComponent } from './report/gmp.packing.cold.room.temp.report'
import { GMPPackingColdRoomTempReportViewerComponent } from './viewer/gmp.packing.cold.room.temp.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-cold-room-temp-report', url: '/report/gmp-packing-cold-room-temp', component: GMPPackingColdRoomTempReportViewerComponent, data: { suffix: 'gmp-packing-cold-room-temp' } }

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
    GMPPackingColdRoomTempReportViewerComponent,
    GMPPackingColdRoomTempReportLoaderComponent,
    GMPPackingColdRoomTempReportComponent,
    GMPPackingColdRoomTempReportItemComponent
  ],
  exports: [
    GMPPackingColdRoomTempReportViewerComponent
  ]
})

export class GMPPackingColdRoomTempReportModule { }
