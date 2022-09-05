import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzBaseModal, MzModalComponent } from 'ngx-materialize'

import { LanguageService } from '../../../../services/app.language'
import { RegisterEntryInterface } from '../../interfaces/register.interface'

@Component({
  templateUrl: './edit-register-modal.component.html'
})

export class EditRegisterModal extends MzBaseModal implements OnInit {
  dateConfig
  registerForm: FormGroup
  @ViewChild('editModal') editModal: MzModalComponent
  @Language() lang: string
  @Input() register: RegisterEntryInterface
  readonly modalOptions: Materialize.ModalOptions
  isEditable: boolean = false
  editMode: boolean = false

  constructor(public langManager: LanguageService) {
    super()
  }

  public ngOnInit(): void {
    this.editionCheck()

    this.dateConfig = this.langManager.messages.global.datePickerConfig
  }

  public editionCheck(): void {
    this.isEditable = false
    const role: string = String(localStorage.getItem('role_name'))

    if (role == 'Supervisor') {
      if (this.register.signable == 1) {
        this.isEditable = true
      }
    } else if (role == 'Employee') {
      const userID: number = Number(localStorage.getItem('user_id'))
      if (userID == this.register.submitter_id && this.register.supervisor_id == null) {
        this.isEditable = true
      }
    }
  }

  public enableEditMode(): void {
    this.editMode = true

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public disableEditMode(): void {
    this.editMode = false
  }

  public editRegister(): void {

  }
}
