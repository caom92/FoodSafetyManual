import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { RegisterService } from '../../../../services/register.service'
import { EditRegisterModal } from '../../register-common/edit-register-modal/edit-register-modal.component'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  templateUrl: './ozone-water-edit-modal.component.html',
  styleUrls: ['./ozone-water-edit-modal.component.css']
})

export class OzoneWaterEditRegisterModalComponent extends EditRegisterModal {
  @Input() register: OzoneWaterEntryInterface
  timeConfig

  constructor(langManager: LanguageService, private registerService: RegisterService, private _fb: FormBuilder, private dataResolver: DataResolverService) {
    super(langManager)
  }

  public ngOnInit(): void {
    super.ngOnInit()
    this.timeConfig = this.langManager.messages.global.timePickerConfig

    this.registerForm = this._fb.group({
      captured_register_id: [this.dataResolver.resolveNumber(this.register.captured_register_id), [Validators.required]],
      date: [this.dataResolver.resolveString(this.register.capture_date), [CustomValidators.dateValidator()]],
      time: [this.dataResolver.resolveString(this.register.time), [CustomValidators.timeValidator()]],
      initials: [this.dataResolver.resolveString(this.register.initials), [Validators.required]],
      area: [this.dataResolver.resolveString(this.register.area), [Validators.required]]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public editRegister(): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.edit('ozone-water', this.registerForm.value).then(success => {
        this.register.capture_date = success.capture_date
        this.register.time = success.time
        this.register.initials = success.initials
        this.register.area = success.area

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
