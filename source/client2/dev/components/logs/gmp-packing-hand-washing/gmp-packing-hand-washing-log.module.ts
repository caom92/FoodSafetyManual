import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingHandWashingItemComponent } from './item/gmp.packing.hand.washing.item'
import { GMPPackingHandWashingLogComponent } from './log/gmp.packing.hand.washing.log'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-hand-washing-capture', url: '/capture/gmp-packing-hand-washing', component: GMPPackingHandWashingLogComponent, data: { suffix: 'gmp-packing-hand-washing' } }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [logState] }),
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