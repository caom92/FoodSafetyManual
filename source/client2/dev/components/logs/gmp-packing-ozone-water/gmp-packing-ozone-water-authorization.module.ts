import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingOzoneWaterAuthorizationComponent } from './authorization/gmp.packing.ozone.water.authorization'
import { GMPPackingOzoneWaterLogModule } from './gmp-packing-ozone-water-log.module'
import { GMPPackingOzoneWaterAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingOzoneWaterAuthorizationRoutingModule,
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
