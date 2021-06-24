import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MzBaseModal } from 'ngx-materialize'

import { RegisterService } from '../../../../services/register.service'

@Component({
  templateUrl: './register-footer-add.component.html'
})

export class AddRegisterFooterModalComponent extends MzBaseModal implements OnInit {
  @Input() zoneID: number = null
  @Input() registerID: number = null
  addFooterForm: FormGroup

  constructor(private _fb: FormBuilder, private registerService: RegisterService) {
    super()
  }
  
  public ngOnInit(): void {
    this.addFooterForm = this._fb.group({
      zone_id: [this.zoneID, Validators.required],
      register_id: [this.registerID, Validators.required],
      footer: [null, Validators.required]
    })
  }

  public addRegisterFooter(): void {
    if (this.addFooterForm.valid) {
      this.registerService.addFooter(this.addFooterForm.value).then(success => {

      }, error => {

      })
    }
  }
}