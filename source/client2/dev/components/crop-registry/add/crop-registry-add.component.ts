import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { CustomValidators } from '../../../directives/custom.validators'

import { CropRegistryService } from '../../../services/crop-registry.service'
import { LanguageService } from '../../../services/app.language'
import { CropRegistryEntryInterface } from '../interfaces/crop-registry.interface'

@Component({
  selector: 'crop-registry-add',
  templateUrl: './crop-registry-add.component.html'
})

export class CropRegistryAddComponent implements OnInit {
  @Language() lang: string
  @Output() addRegister = new EventEmitter<CropRegistryEntryInterface>()
  dateConfig
  registerForm: FormGroup

  constructor(private cropRegistryService: CropRegistryService, private langManager: LanguageService, private _fb: FormBuilder) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.registerForm = this._fb.group({
      date: [null, [CustomValidators.dateValidator()]],
      crop: [null, [Validators.maxLength(255)]],
      variety: [null, [Validators.maxLength(255)]],
      section: [null, [Validators.maxLength(255)]],
      block: [null, [Validators.maxLength(255)]],
      weight: [null, [Validators.min(1)]],
      people: [null, [Validators.min(1)]],
      hours: [null, [Validators.min(1)]]
    })
  }

  public onAddRegister(): void {
    this.cropRegistryService.addRegistry(this.registerForm.value).then(success => {
      this.addRegister.emit({
        id: success,
        submitter_first_name: '',
        submitter_last_name: '',
        zone_name: localStorage.getItem('zone_name'),
        date: this.registerForm.value.date,
        crop: this.registerForm.value.crop,
        variety: this.registerForm.value.variety,
        section: this.registerForm.value.section,
        block: this.registerForm.value.block,
        weight: this.registerForm.value.weight,
        people: this.registerForm.value.people,
        hours: this.registerForm.value.hours
      })

      this.registerForm.reset()
    })
  }
}