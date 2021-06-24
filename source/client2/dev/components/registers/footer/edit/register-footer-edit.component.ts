import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MzBaseModal } from 'ngx-materialize'

import { RegisterService } from '../../../../services/register.service'

@Component({
  templateUrl: './register-footer-edit.component.html'
})

export class EditRegisterFooterModalComponent extends MzBaseModal implements OnInit {
  @Input() footerID: number = null
  @Input() footer: string = null
  editFooterForm: FormGroup

  constructor(private _fb: FormBuilder, private registerService: RegisterService) {
    super()
  }

  public ngOnInit(): void {
    this.editFooterForm = this._fb.group({
      footer_id: [this.footerID, Validators.required],
      footer: [this.footer, Validators.required]
    })
  }

  public editRegisterFooter(): void {
    if (this.editFooterForm.valid) {
      this.registerService.editFooter(this.editFooterForm.value).then(success => {

      }, error => {

      })
    }
  }
}