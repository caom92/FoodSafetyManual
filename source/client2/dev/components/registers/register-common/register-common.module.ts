import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterTitleComponent } from './register-title/register-title.component'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    RegisterTitleComponent
  ],
  exports: [
    RegisterTitleComponent
  ]
})

export class RegisterCommonModule { }
