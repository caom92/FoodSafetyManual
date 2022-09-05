import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { CustomValidators } from '../../../../directives/custom.validators'

import { RegisterService } from '../../../../services/register.service'
import { LanguageService } from '../../../../services/app.language'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  selector: 'ozone-water-add',
  templateUrl: './ozone-water-add.component.html'
})

export class OzoneWaterAddComponent implements OnInit {
  @Language() lang: string
  @Output() addRegister = new EventEmitter<OzoneWaterEntryInterface>()
  dateConfig
  timeConfig
  registerForm: FormGroup

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    this.timeConfig = this.langManager.messages.global.timePickerConfig

    this.registerForm = this._fb.group({
      date: [null, [CustomValidators.dateValidator()]],
      time: [null, [CustomValidators.timeValidator()]],
      initials: [null, [Validators.required]],
      area: [null, [Validators.required]]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public onAddRegister(): void {
    if (this.registerForm.valid == true) {
      this.registerService.add('ozone-water', this.registerForm.value).then(success => {
        this.addRegister.emit({
          id: success,
          captured_register_id: success,
          capture_date: this.registerForm.value.date,
          time: this.registerForm.value.time,
          area: this.registerForm.value.area,
          initials: this.registerForm.value.initials,
          submitter_id: Number(localStorage.getItem('user_id')),
          signable: 0,
          signature_path: null,
          supervisor_id: null,
          gp_signable: 0,
          gp_supervisor_id: null,
          gp_signature_path: null,
          zone_id: Number(localStorage.getItem('zone_id')),
          zone: localStorage.getItem('zone_name')
        })

        this.registerForm.reset()
      })
    }
  }
}
