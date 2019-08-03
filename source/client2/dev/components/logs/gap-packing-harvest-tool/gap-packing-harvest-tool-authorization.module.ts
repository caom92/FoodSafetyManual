import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestToolAuthorizationComponent } from './authorization/gap-packing-harvest-tool-authorization.component'
import { GAPPackingHarvestToolLogModule } from './gap-packing-harvest-tool-log.module'
import { GAPPackingHarvestToolAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingHarvestToolAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingHarvestToolLogModule
  ],
  declarations: [
    GAPPackingHarvestToolAuthorizationComponent
  ],
  exports: [
    GAPPackingHarvestToolAuthorizationComponent
  ]
})

export class GAPPackingHarvestToolAuthorizationModule { }
