import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { GPSignaturesRoutingModule } from './gp-signatures-routing.module'
import { GPSignaturesComponent } from './list/gp-signatures-list.component'
import { GPSignaturesLogListComponent } from './log-list/gp-signatures-log-list.component'
import { GPSignaturesSignatureComponent } from './signature/gp-signatures-signature.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    GPSignaturesRoutingModule,
    CommonModule
  ],
  declarations: [
    GPSignaturesComponent,
    GPSignaturesLogListComponent,
    GPSignaturesSignatureComponent
  ],
  exports: [
    GPSignaturesComponent,
    GPSignaturesLogListComponent,
    GPSignaturesSignatureComponent
  ]
})

export class GPSignaturesModule { }
