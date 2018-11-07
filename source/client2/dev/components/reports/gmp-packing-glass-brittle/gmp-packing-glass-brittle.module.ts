import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ReportCommonModule } from '../report-common/report-common.module'
import { GMPPackingGlassBrittleReportAreaComponent } from './area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleReportItemComponent } from './item/gmp.packing.glass.brittle.item'
import { GMPPackingGlassBrittleReportLoaderComponent } from './loader/gmp.packing.glass.brittle.report.loader.component'
import { GMPPackingGlassBrittleReportComponent } from './report/gmp.packing.glass.brittle.report'
import { GMPPackingGlassBrittleReportViewerComponent } from './viewer/gmp.packing.glass.brittle.report.viewer.component'

const reportState: Ng2StateDeclaration = { name: 'gmp-packing-glass-brittle-report', url: '/report/gmp-packing-glass-brittle', component: GMPPackingGlassBrittleReportViewerComponent, data: { suffix: 'gmp-packing-glass-brittle' } }

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
    GMPPackingGlassBrittleReportViewerComponent,
    GMPPackingGlassBrittleReportLoaderComponent,
    GMPPackingGlassBrittleReportComponent,
    GMPPackingGlassBrittleReportAreaComponent,
    GMPPackingGlassBrittleReportItemComponent
  ],
  exports: [
    GMPPackingGlassBrittleReportViewerComponent
  ]
})

export class GMPPackingGlassBrittleReportModule { }
