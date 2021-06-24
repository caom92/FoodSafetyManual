import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { RegisterService } from '../../../../services/register.service'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  selector: 'vehicle-cleaning-details',
  templateUrl: './vehicle-cleaning-details.component.html',
  styleUrls: ['./vehicle-cleaning-details.component.css']
})

export class VehicleCleaningDetailsComponent {
  @Language() lang: string
  @Input() register: VehicleCleaningEntryInterface
  dateConfig
  registerForm: FormGroup
  isEditable: boolean = false
  editMode: boolean = false

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder, private dataResolver: DataResolverService) {}

  public ngOnChanges(): void {
    this.isEditable = false
    const role: string = String(localStorage.getItem('role_name'))

    if (role == 'Supervisor') {
      if (this.register.signable == 1) {
        this.isEditable = true
        this.initForm()
      }
    } else if (role == 'Employee') {
      const userID: number = Number(localStorage.getItem('user_id'))
      if (userID == this.register.submitter_id && this.register.supervisor_id == null) {
        this.isEditable = true
        this.initForm()
      }
    }
  }

  public initForm(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.registerForm = this._fb.group({
      captured_register_id: [this.dataResolver.resolveNumber(this.register.captured_register_id), [Validators.required]],
      date: [this.dataResolver.resolveString(this.register.capture_date), [CustomValidators.dateValidator()]],
      license_plate: [this.dataResolver.resolveString(this.register.license_plate), [Validators.required]],
      disinfection: [this.dataResolver.resolveNumber(this.register.disinfection), [Validators.required]],
      water_rinse: [this.dataResolver.resolveBoolean(this.register.water_rinse), [Validators.required]],
      conditions: [this.dataResolver.resolveBoolean(this.register.conditions), [Validators.required]],
      contamination_free: [this.dataResolver.resolveBoolean(this.register.contamination_free), [Validators.required]],
      corrective_action: [this.dataResolver.resolveString(this.register.corrective_action), [Validators.required]],
      initials: [this.dataResolver.resolveString(this.register.initials), [Validators.required]]
    })

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }
  
  public enableEditMode(): void {
    this.editMode = true

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public disableEditMode(): void {
    this.editMode = false
  }

  public editRegister(): void {
    this.registerService.edit('vehicle-cleaning', this.registerForm.value).then(success => {
      this.editMode = false
      this.register.capture_date = success.capture_date
      this.register.license_plate = success.license_plate
      this.register.disinfection = success.disinfection
      this.register.water_rinse = success.water_rinse
      this.register.conditions = success.conditions
      this.register.contamination_free = success.contamination_free
      this.register.corrective_action = success.corrective_action
      this.register.initials = success.initials
    })
  }
}