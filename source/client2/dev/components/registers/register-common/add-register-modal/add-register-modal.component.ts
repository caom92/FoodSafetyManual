import { Component, ViewChild } from '@angular/core'
import { MzBaseModal, MzModalComponent } from 'ngx-materialize'
import { Language } from 'angular-l10n'

@Component({
  templateUrl: './add-register-modal.component.html'
})

export class AddRegisterModal extends MzBaseModal {
  @ViewChild('addModal') addModal: MzModalComponent
  @Language() lang: string
  readonly modalOptions: Materialize.ModalOptions

  constructor() {
    super()
  }

  public addRegister(close: boolean = false): void {
    
  }

  public addRegisterAndClose(): void {
    this.addRegister(true)
    //this.addModal.closeModal()
  }
}
