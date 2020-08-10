import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzBaseModal } from 'ngx-materialize'

import { GPSignaturesService } from '../../../services/gp-signatures.service'
import { GPSignature } from '../signature/gp-signatures-signature.inteface'

@Component({
  templateUrl: './gp-signatures-edit-modal.component.html'
})

export class GPSignaturesEditModalComponent extends MzBaseModal implements OnInit {
  @Language() lang: string
  @Input() signature: GPSignature
  signatureForm: FormGroup = null

  constructor(private formBuilder: FormBuilder, private gpSignaturesService: GPSignaturesService) {
    super()
  }

  public ngOnInit(): void {
    this.signatureForm = this.formBuilder.group({
      supervisor_id: [this.signature.id, [Validators.required]],
      signature_file: [null, [Validators.required]]
    })
  }

  public onFileSelected(event: Event): void {
    let files: FileList = (<HTMLInputElement>event.target).files

    if (files.length === 1) {
      this.signatureForm.controls.signature_file.setValue(files[0])
    } else {
      this.signatureForm.controls.signature_file.setValue(null)
    }
  }

  public onSendButtonClick(): void {
    console.log('send button click', this.signatureForm)

    this.gpSignaturesService.addSignature(this.signatureForm.value)
  }
}