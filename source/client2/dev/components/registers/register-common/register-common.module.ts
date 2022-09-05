import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterTitleComponent } from './register-title/register-title.component'
import { RegisterReportGeneratorComponent } from './register-report-generator/register-report-generator.component'
import { AddRegisterModal } from './add-register-modal/add-register-modal.component'
import { EditRegisterModal } from './edit-register-modal/edit-register-modal.component'
import { SearchModal } from './search-modal/search-modal.component'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AddRegisterModal,
    EditRegisterModal,
    SearchModal,
    RegisterReportGeneratorComponent,
    RegisterTitleComponent
  ],
  exports: [
    AddRegisterModal,
    EditRegisterModal,
    SearchModal,
    RegisterReportGeneratorComponent,
    RegisterTitleComponent
  ],
  entryComponents: [
    AddRegisterModal,
    EditRegisterModal,
    SearchModal
  ]
})

export class RegisterCommonModule { }
