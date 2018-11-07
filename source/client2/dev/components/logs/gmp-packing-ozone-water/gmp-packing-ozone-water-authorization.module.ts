import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingOzoneWaterAuthorizationComponent } from './authorization/gmp.packing.ozone.water.authorization'
import { GMPPackingOzoneWaterLogModule } from './gmp-packing-ozone-water-log.module'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-ozone-water-authorization', url: '/authorizations/gmp-packing-ozone-water/:report_id', component: GMPPackingOzoneWaterAuthorizationComponent, data: { suffix: 'gmp-packing-ozone-water' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
    CommonModule,
    LogCommonModule,
    GMPPackingOzoneWaterLogModule
  ],
  declarations: [
    GMPPackingOzoneWaterAuthorizationComponent
  ],
  exports: [
    GMPPackingOzoneWaterAuthorizationComponent
  ]
})

export class GMPPackingOzoneWaterAuthorizationModule { }