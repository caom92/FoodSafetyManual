import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { RegisterService } from '../../../../services/register.service'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  selector: 'ozone-water-details',
  templateUrl: './ozone-water-details.component.html',
  styleUrls: ['./ozone-water-details.component.css']
})

export class OzoneWaterDetailsComponent {
  @Language() lang: string
  @Input() register: OzoneWaterEntryInterface
  timeConfig
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
    this.registerService.edit('ozone-water', this.registerForm.value).then(success => {
      this.editMode = false
      this.register.capture_date = success.capture_date
      this.register.time = success.time
      this.register.initials = success.initials
      this.register.area = success.area
    })
  }
}
