import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingGlassBrittleLogModule } from '../../logs/gmp-packing-glass-brittle/gmp-packing-glass-brittle-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingGlassBrittleReportModule } from '../../reports/gmp-packing-glass-brittle/gmp-packing-glass-brittle-report.module'
import { GMPPackingGlassBrittleCaptureComponent } from './capture/gmp-packing-glass-brittle-capture.component'
import { GMPPackingGlassBrittleCaptureRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    GMPPackingGlassBrittleCaptureRoutingModule,
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
