import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingWaterResourceAuthorizationComponent } from './authorization/gap.packing.water.resource.authorization'
import { GAPPackingWaterResourceLogModule } from './gap-packing-water-resource-log.module'
import { GAPPackingWaterResourceAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingWaterResourceAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingWaterResourceLogModule
  ],
  declarations: [
    GAPPackingWaterResourceAuthorizationComponent
  ],
  exports: [
    GAPPackingWaterResourceAuthorizationComponent
  ]
})

export class GAPPackingWaterResourceAuthorizationModule { }
