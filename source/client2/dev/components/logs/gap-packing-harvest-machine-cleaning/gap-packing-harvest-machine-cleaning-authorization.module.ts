import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GAPPackingHarvestMachineCleaningAuthorizationComponent } from './authorization/gap-packing-harvest-machine-cleaning-authorization.component'
import { GAPPackingHarvestMachineCleaningLogModule } from './gap-packing-harvest-machine-cleaning-log.module'
import { GAPPackingHarvestMachineCleaningAuthorizationRoutingModule } from './routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GAPPackingHarvestMachineCleaningAuthorizationRoutingModule,
    CommonModule,
    LogCommonModule,
    GAPPackingHarvestMachineCleaningLogModule
  ],
  declarations: [
    GAPPackingHarvestMachineCleaningAuthorizationComponent
  ],
  exports: [
    GAPPackingHarvestMachineCleaningAuthorizationComponent
  ]
})

export class GAPPackingHarvestMachineCleaningAuthorizationModule { }
