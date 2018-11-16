import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHandWashingItemComponent } from './item/gmp.packing.hand.washing.item'
import { GMPPackingHandWashingLogComponent } from './log/gmp.packing.hand.washing.log'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    LogCommonModule,
    CommonModule
  ],
  declarations: [
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent
  ],
  exports: [
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent
  ]
})

export class GMPPackingHandWashingLogModule { }
