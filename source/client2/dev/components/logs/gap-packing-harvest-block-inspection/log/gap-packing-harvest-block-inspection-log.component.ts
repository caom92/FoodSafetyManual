import { Component, Input } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogItem } from '../interfaces/gap-packing-harvest-block-inspection-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gap-packing-harvest-block-inspection-log',
  templateUrl: './gap-packing-harvest-block-inspection-log.component.html'
})

export class GAPPackingHarvestBlockInspectionLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string
  dateConfig
  timeConfig

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, private langManager: LanguageService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-harvest-block-inspection')
    super.ngOnInit()
  }

  initForm() {
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    this.timeConfig = this.langManager.messages.global.timePickerConfig
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      inspection_start_date: [this.dataResolver.resolveString(this.log.inspection_start_date), [CustomValidators.dateValidator()]],
      inspection_start_time: [this.dataResolver.resolveString(this.log.inspection_start_time), [CustomValidators.timeValidator()]],
      inspection_end_date: [this.dataResolver.resolveString(this.log.inspection_end_date), [CustomValidators.dateValidator()]],
      inspection_end_time: [this.dataResolver.resolveString(this.log.inspection_end_time), [CustomValidators.timeValidator()]],
      commodities: [this.dataResolver.resolveString(this.log.commodities), [Validators.required, Validators.maxLength(this.maxLengths.commodities)]],
      units: [this.dataResolver.resolveNumber(this.log.units), [Validators.required]],
      unit_type: [this.dataResolver.resolveNumber(this.log.unit_type), [Validators.required]],
      grower: [this.dataResolver.resolveString(this.log.grower), [Validators.required, Validators.maxLength(this.maxLengths.grower)]],
      block_code: [this.dataResolver.resolveString(this.log.block_code), [Validators.required, Validators.maxLength(this.maxLengths.block_code)]],
      contact: [this.dataResolver.resolveString(this.log.contact), [Validators.required, Validators.maxLength(this.maxLengths.contact)]],
      location: [this.dataResolver.resolveString(this.log.location), [Validators.required, Validators.maxLength(this.maxLengths.location)]],
      country: [this.dataResolver.resolveString(this.log.country), [Validators.required, Validators.maxLength(this.maxLengths.country)]],
      items: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, [Validators.required]))
    }

    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem(item))
    }
  }

  initItem(item: LogItem): FormGroup {
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

  resetForm() {
    this.captureForm.reset()
  }
}