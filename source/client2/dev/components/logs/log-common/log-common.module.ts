import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { LogHeaderComponent } from './log-header/log-header.component'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    LogHeaderComponent
  ],
  exports: [
    LogHeaderComponent
  ]
})

export class LogCommonModule { }
