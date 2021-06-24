import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { CustomValidators } from '../../../../directives/custom.validators'

import { RegisterService } from '../../../../services/register.service'
import { LanguageService } from '../../../../services/app.language'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  selector: 'vehicle-cleaning-add',
  templateUrl: './vehicle-cleaning-add.component.html'
})

export class VehicleCleaningAddComponent implements OnInit {
  @Language() lang: string
  @Output() addRegister = new EventEmitter<VehicleCleaningEntryInterface>()
  dateConfig
  registerForm: FormGroup

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.registerForm = this._fb.group({
      date: [null, [CustomValidators.dateValidator()]],
      license_plate: [null, [Validators.required]],
      disinfection: [null, [Validators.required]],
      water_rinse: [null, [Validators.required]],
      conditions: [null, [Validators.required]],
      contamination_free: [null, [Validators.required]],
      corrective_action: [null, [Validators.required]],
      initials: [null, [Validators.required]]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public onAddRegister(): void {
    this.registerService.add('vehicle-cleaning', this.registerForm.value).then(success => {
      this.addRegister.emit({
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
        zone_id: Number(localStorage.getItem('zone_name'))
      })

      this.registerForm.reset()
    })
  }
}