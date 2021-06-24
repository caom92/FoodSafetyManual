import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterListComponent } from './register-list/register-list.component'
import { RegistersRoutingModule } from './registers-routing.module'

@NgModule({
  imports: [
    RegistersRoutingModule,
    MaterializeModule,
    LocalizationModule,
    CommonModule
  ],
  declarations: [
    RegisterListComponent
  ],
  exports: [
    RegisterListComponent
  ]
})

export class RegistersModule { }