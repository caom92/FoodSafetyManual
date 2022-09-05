import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { RegisterService } from '../../../../services/register.service'
import { AddRegisterModal } from '../../register-common/add-register-modal/add-register-modal.component'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  templateUrl: './ozone-water-add-modal.component.html'
})

export class OzoneWaterAddRegisterModalComponent extends AddRegisterModal {
  dateConfig
  timeConfig
  registerForm: FormGroup
  @Input() onClose: (register: OzoneWaterEntryInterface) => {}

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder) {
    super()
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

  public addRegister(): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.add('ozone-water', this.registerForm.value).then(success => {
        this.onClose({
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
    } else {
      this.registerForm.enable()
    }
  }

  public cleanForm(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.registerForm.controls.time)
    controlArray.push(this.registerForm.controls.area)
    controlArray.push(this.registerForm.controls.initials)

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }
  }
}
