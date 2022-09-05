import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { RegisterService } from '../../../../services/register.service'
import { EditRegisterModal } from '../../register-common/edit-register-modal/edit-register-modal.component'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  templateUrl: './vehicle-cleaning-edit-modal.component.html',
  styleUrls: ['./vehicle-cleaning-edit-modal.component.css']
})

export class VehicleCleaningEditRegisterModalComponent extends EditRegisterModal {
  @Input() register: VehicleCleaningEntryInterface

  constructor(langManager: LanguageService, private registerService: RegisterService, private _fb: FormBuilder, private dataResolver: DataResolverService) {
    super(langManager)
  }

  public ngOnInit(): void {
    super.ngOnInit()

    this.registerForm = this._fb.group({
      captured_register_id: [this.dataResolver.resolveNumber(this.register.captured_register_id), [Validators.required]],
      date: [this.dataResolver.resolveString(this.register.capture_date), [CustomValidators.dateValidator()]],
      license_plate: [this.dataResolver.resolveString(this.register.license_plate), []],
      disinfection: [this.dataResolver.resolveNumber(this.register.disinfection), []],
      water_rinse: [this.dataResolver.resolveBoolean(this.register.water_rinse), []],
      conditions: [this.dataResolver.resolveBoolean(this.register.conditions), []],
      contamination_free: [this.dataResolver.resolveBoolean(this.register.contamination_free), []],
      corrective_action: [this.dataResolver.resolveString(this.register.corrective_action), []],
      initials: [this.dataResolver.resolveString(this.register.initials), []]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public editRegister(): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.edit('vehicle-cleaning', this.registerForm.value).then(success => {
        this.register.capture_date = success.capture_date
        this.register.license_plate = success.license_plate
        this.register.disinfection = success.disinfection
        this.register.water_rinse = success.water_rinse
        this.register.conditions = success.conditions
        this.register.contamination_free = success.contamination_free
        this.register.corrective_action = success.corrective_action
        this.register.initials = success.initials

        this.editModal.closeModal()
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
