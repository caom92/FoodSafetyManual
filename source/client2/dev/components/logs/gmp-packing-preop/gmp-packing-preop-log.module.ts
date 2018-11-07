import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogCommonModule } from '../log-common/log-common.module'
import { GMPPackingPreopAreaComponent } from './area/gmp.packing.preop.area'
import { GMPPackingPreopItemComponent } from './item/gmp.packing.preop.item'
import { GMPPackingPreopLogComponent } from './log/gmp.packing.preop.log'
import { GMPPackingPreopTypeComponent } from './type/gmp.packing.preop.type'

const logState: Ng2StateDeclaration = { name: 'gmp-packing-preop-capture', url: '/capture/gmp-packing-preop', component: GMPPackingPreopLogComponent, data: { suffix: 'gmp-packing-preop' } }

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
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent
  ],
  exports: [
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent
  ]
})

export class GMPPackingPreopLogModule { }