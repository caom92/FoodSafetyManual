import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { RegisterService } from '../../../../services/register.service'
import { AddRegisterModal } from '../../register-common/add-register-modal/add-register-modal.component'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  templateUrl: './vehicle-cleaning-add-modal.component.html'
})

export class VehicleCleaningAddRegisterModalComponent extends AddRegisterModal {
  dateConfig
  registerForm: FormGroup
  @Input() onClose: (register: VehicleCleaningEntryInterface) => {}

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder) {
    super()
  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.registerForm = this._fb.group({
      date: [null, [CustomValidators.dateValidator(), Validators.required]],
      license_plate: [null, []],
      disinfection: [null, []],
      water_rinse: [null, []],
      conditions: [null, []],
      contamination_free: [null, []],
      corrective_action: [null, []],
      initials: [null, []]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public addRegister(): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.add('vehicle-cleaning', this.registerForm.value).then(success => {
        this.onClose({
          id: success,
          captured_register_id: success,
          capture_date: this.registerForm.value.date,
          license_plate: this.registerForm.value.license_plate,
          disinfection: this.registerForm.value.disinfection,
          water_rinse: this.registerForm.value.water_rinse,
          conditions: this.registerForm.value.conditions,
          contamination_free: this.registerForm.value.contamination_free,
          corrective_action: this.registerForm.value.corrective_action,
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

    controlArray.push(this.registerForm.controls.license_plate)
    controlArray.push(this.registerForm.controls.disinfection)
    controlArray.push(this.registerForm.controls.water_rinse)
    controlArray.push(this.registerForm.controls.conditions)
    controlArray.push(this.registerForm.controls.contamination_free)
    controlArray.push(this.registerForm.controls.corrective_action)
    controlArray.push(this.registerForm.controls.initials)

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }
  }
}
