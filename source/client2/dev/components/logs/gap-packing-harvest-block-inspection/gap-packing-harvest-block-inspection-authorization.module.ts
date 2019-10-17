import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestBlockInspectionAuthorizationComponent } from './authorization/gap-packing-harvest-block-inspection-authorization.component'
import { GAPPackingHarvestBlockInspectionLogModule } from './gap-packing-harvest-block-inspection-log.module'
import { GAPPackingHarvestBlockInspectionAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingHarvestBlockInspectionAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingHarvestBlockInspectionLogModule
  ],
  declarations: [
    GAPPackingHarvestBlockInspectionAuthorizationComponent
  ],
  exports: [
    GAPPackingHarvestBlockInspectionAuthorizationComponent
  ]
})

export class GAPPackingHarvestBlockInspectionAuthorizationModule { }
