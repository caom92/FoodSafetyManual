import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GMPPackingOzoneWaterLogModule } from '../../logs/gmp-packing-ozone-water/gmp-packing-ozone-water-log.module'
import { ManualModule } from '../../manual/manual.module'
import { GMPPackingOzoneWaterReportModule } from '../../reports/gmp-packing-ozone-water/gmp-packing-ozone-water.module'
import { GMPPackingOzoneWaterCaptureComponent } from './capture/gmp-packing-ozone-water-capture.component'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-ozone-water-log', url: '/log/gmp-packing-ozone-water', component: GMPPackingOzoneWaterCaptureComponent, data: { suffix: 'gmp-packing-ozone-water' } }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    GMPPackingOzoneWaterLogModule,
    GMPPackingOzoneWaterReportModule,
    ManualModule,
    CommonModule
  ],
  declarations: [
    GMPPackingOzoneWaterCaptureComponent
  ]
})

export class GMPPackingOzoneWaterCaptureModule { }