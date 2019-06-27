import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHarvestToolAuthorizationComponent } from './authorization/gmp-packing-harvest-tool-authorization.component'
import { GMPPackingHarvestToolLogModule } from './gmp-packing-harvest-tool-log.module'
import { GMPPackingHarvestToolAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GMPPackingHarvestToolAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GMPPackingHarvestToolLogModule
  ],
  declarations: [
    GMPPackingHarvestToolAuthorizationComponent
  ],
  exports: [
    GMPPackingHarvestToolAuthorizationComponent
  ]
})

export class GMPPackingHarvestToolAuthorizationModule { }
