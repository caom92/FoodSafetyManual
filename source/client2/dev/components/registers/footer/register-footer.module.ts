import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'
import { AddRegisterFooterModalComponent } from './add/register-footer-add.component'

import { RegisterFooterCustomizerComponent } from './customizer/register-footer-customizer.component'
import { EditRegisterFooterModalComponent } from './edit/register-footer-edit.component'
import { RegisterFooterRoutingModule } from './register-footer-routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    RegisterFooterRoutingModule,
    CommonModule
  ],
  declarations: [
    AddRegisterFooterModalComponent,
    EditRegisterFooterModalComponent,
    RegisterFooterCustomizerComponent
  ],
  entryComponents: [
    AddRegisterFooterModalComponent,
    EditRegisterFooterModalComponent,
  ],
  exports: [
    AddRegisterFooterModalComponent,
    EditRegisterFooterModalComponent,
    RegisterFooterCustomizerComponent
  ]
})

export class RegisterFooterModule {}
