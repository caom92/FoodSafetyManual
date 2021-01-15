import { Component, Input } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogDay, LogItem } from '../interfaces/gmp-packing-bathroom-cleaning-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gmp-packing-bathroom-cleaning-log',
  templateUrl: './gmp-packing-bathroom-cleaning-log.component.html'
})

export class GMPPackingBathroomCleaningLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-bathroom-cleaning')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      days: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, []))
    }

    const control = <FormArray>this.captureForm.controls['days']
    for (let day of this.log.days) {
      control.push(this.initDay(day))
    }
  }

  initDay(day: LogDay): FormGroup {
    let captureDayGroup: FormGroup = this._fb.group({
      date: [this.dataResolver.resolveString(day.date), [Validators.required, CustomValidators.dateValidator()]],
      time: [this.dataResolver.resolveString(day.time), [Validators.required, CustomValidators.timeValidator()]],
      initials: [this.dataResolver.resolveString(day.initials), []],
      day_num: [this.dataResolver.resolveNumber(day.day_num), [Validators.required]],
      items: this._fb.array([])
    })

    const control = <FormArray>captureDayGroup.controls['items']
    for (let item of day.items) {
      control.push(this.initTool(item))
    }

    return captureDayGroup
  }

  initTool(item: LogItem): FormGroup {
    let captureTypeGroup: FormGroup = this._fb.group({
      item_id: [this.dataResolver.resolveNumber(item.item_id), [Validators.required]],
      status: [this.dataResolver.resolveBoolean(item.status), []],
      activity: [this.dataResolver.resolveString(item.activity), []]
    })

    return captureTypeGroup
  }

  onEntryAdd() {
    const control = <FormArray>this.captureForm.controls['days']

    let items: Array<LogItem> = []

    for (let item of this.log.days[0].items) {
      items.push({ item_id: Number(item.item_id), name: String(item.name), status: null, activity: '' })
    }

    let day: LogDay = {
      date: '',
      time: '',
      initials: '',
      day_num: control.controls.length + 1,
      items: items
    }

    this.log.days.push(day)
    control.push(this.initDay(day))
  }

  cleanForm() {
    for (let d in (<FormGroup>this.captureForm.controls.days).controls) {
      const day = (<FormGroup>(<FormGroup>this.captureForm.controls.days).controls[d])
      for (let t in (<FormGroup>day.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>day.controls.items).controls[t])

        let controlArray: Array<AbstractControl> = []

        controlArray.push(item.controls.status)
        controlArray.push(item.controls.activity)

        for (let control of controlArray) {
          if (control.value === null || control.value === '') {
            control.disable()
          }
        }
      }
    }
  }

  enableForm() {
    this.captureForm.enable()
  }

  onEntryRemove() {
    const control = <FormArray>this.captureForm.controls['days']

    if (control.controls.length > 1) {
      control.controls.pop()
      this.log.days.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  resetForm() {
    this.captureForm.reset()
  }
}