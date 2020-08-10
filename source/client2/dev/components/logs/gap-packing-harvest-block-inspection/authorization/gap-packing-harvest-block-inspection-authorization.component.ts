import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationItem } from '../interfaces/gap-packing-harvest-block-inspection-authorization.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gap-packing-harvest-block-inspection-authorization',
  templateUrl: './gap-packing-harvest-block-inspection-authorization.component.html'
})

export class GAPPackingHarvestBlockInspectionAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization
  dateConfig
  timeConfig
  
  readonly maxLengths = maxLengths

  constructor(private dataResolver: DataResolverService, private langManager: LanguageService, _fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gap-packing-harvest-block-inspection')
    super.ngOnInit()
  }

  initForm(): void {
    super.initForm()
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    this.timeConfig = this.langManager.messages.global.timePickerConfig

    const itemsControl: FormArray = this._fb.array([])
    for (let item of this.log.items) {
      itemsControl.push(this.initItem(item))
    }

    this.captureForm.addControl('inspection_start_date', new FormControl(this.dataResolver.resolveString(this.log.inspection_start_date), [CustomValidators.dateValidator()]))
    this.captureForm.addControl('inspection_start_time', new FormControl(this.dataResolver.resolveString(this.log.inspection_start_time), [CustomValidators.timeValidator()]))
    this.captureForm.addControl('inspection_end_date', new FormControl(this.dataResolver.resolveString(this.log.inspection_end_date), [CustomValidators.dateValidator()]))
    this.captureForm.addControl('inspection_end_time', new FormControl(this.dataResolver.resolveString(this.log.inspection_end_time), [CustomValidators.timeValidator()]))
    this.captureForm.addControl('commodities', new FormControl(this.dataResolver.resolveString(this.log.commodities), [Validators.required, Validators.maxLength(this.maxLengths.commodities)]))
    this.captureForm.addControl('pounds', new FormControl(this.dataResolver.resolveNumber(this.log.pounds), [Validators.required]))
    this.captureForm.addControl('grower', new FormControl(this.dataResolver.resolveString(this.log.grower), [Validators.required, Validators.maxLength(this.maxLengths.grower)]))
    this.captureForm.addControl('block_code', new FormControl(this.dataResolver.resolveString(this.log.block_code), [Validators.required, Validators.maxLength(this.maxLengths.block_code)]))
    this.captureForm.addControl('contact', new FormControl(this.dataResolver.resolveString(this.log.contact), [Validators.required, Validators.maxLength(this.maxLengths.contact)]))
    this.captureForm.addControl('location', new FormControl(this.dataResolver.resolveString(this.log.location), [Validators.required, Validators.maxLength(this.maxLengths.location)]))
    this.captureForm.addControl('country', new FormControl(this.dataResolver.resolveString(this.log.country), [Validators.required, Validators.maxLength(this.maxLengths.country)]))
    this.captureForm.addControl('items', itemsControl)
  }

  initItem(item: AuthorizationItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(item.id), [Validators.required]],
      status: [this.dataResolver.resolveBoolean(item.status), []],
      comment: [this.dataResolver.resolveString(item.comment), [Validators.required, Validators.maxLength(this.maxLengths.comment)]]
    })

    if (captureItemGroup.controls.status.value === true) {
      captureItemGroup.controls.comment.enable()
    } else {
      captureItemGroup.controls.comment.disable()
    }

    return captureItemGroup
  }

  cleanForm() {
    let infoControlArray: Array<AbstractControl> = []

    infoControlArray.push(this.captureForm.controls.inspection_start_date)
    infoControlArray.push(this.captureForm.controls.inspection_start_time)
    infoControlArray.push(this.captureForm.controls.inspection_end_date)
    infoControlArray.push(this.captureForm.controls.inspection_end_time)

    for (let control of infoControlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }

    for (let i in (<FormGroup>this.captureForm.controls.items).controls) {
      const item = (<FormGroup>(<FormGroup>this.captureForm.controls.items).controls[i])

      let itemControlArray: Array<AbstractControl> = []

      itemControlArray.push(item.controls.status)
      //itemControlArray.push(item.controls.comment)

      for (let control of itemControlArray) {
        if (control.value === null || control.value === '') {
          control.disable()
        }
      }
    }
  }

  enableForm() {
    this.captureForm.enable()
  }
}