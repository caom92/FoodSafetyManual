import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingGlassBrittleLogModule } from '../../logs/gmp-packing-glass-brittle/gmp-packing-glass-brittle-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingGlassBrittleReportModule } from '../../reports/gmp-packing-glass-brittle/gmp-packing-glass-brittle.module'
import { GMPPackingGlassBrittleCaptureComponent } from './capture/gmp-packing-glass-brittle-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-glass-brittle-log', url: '/log/gmp-packing-glass-brittle', component: GMPPackingGlassBrittleCaptureComponent, data: { suffix: 'gmp-packing-glass-brittle' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingGlassBrittleLogModule,
    GMPPackingGlassBrittleReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingGlassBrittleCaptureComponent
  ]
})

export class GMPPackingGlassBrittleCaptureModule { }