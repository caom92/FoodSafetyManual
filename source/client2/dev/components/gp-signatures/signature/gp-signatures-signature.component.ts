import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { GPSignaturesService } from '../../../services/gp-signatures.service'
import { GPSignature } from './gp-signatures-signature.inteface'
import { MzModalService } from 'ngx-materialize'
import { GPSignaturesEditModalComponent } from '../edit/gp-signatures-edit-modal.component'

@Component({
  selector: '[gp-signatures-signature]',
  templateUrl: './gp-signatures-signature.component.html'
})

export class GPSignaturesSignatureComponent implements OnInit {
  @Language() lang: string
  @Input() signature: GPSignature
  @Input() zoneList
  signatureForm: FormGroup

  constructor(private formBuilder: FormBuilder, private gpSignaturesService: GPSignaturesService, private modalService: MzModalService) {

  }

  public ngOnInit(): void {
    this.initForm()
  }

  public initForm(): void {
    this.signatureForm = this.formBuilder.group({
      id: [this.signature.id, [Validators.required]],
      zones: [this.signature.zones, [Validators.required]]
    })
  }

  public compareFn(source, zone) {
    return source && zone ? source.id === zone.id : source === zone
  }

  public onSelectChange(): void {
    this.gpSignaturesService.assignZones(this.signatureForm.value)
  }

  public onEditButtonClick(): void {
    this.modalService.open(GPSignaturesEditModalComponent, {
      signature: this.signature
    })
  }
}