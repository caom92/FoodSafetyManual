import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { ManualComponent } from './manual/manual.component'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    CommonModule
  ],
  declarations: [
    ManualComponent
  ],
  exports: [
    ManualComponent
  ]
})

export class ManualModule { }
