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
import { Log, LogDay, LogType } from '../interfaces/gmp-packing-harvest-tool-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gmp-packing-harvest-tool-log',
  templateUrl: './gmp-packing-harvest-tool-log.component.html'
})

export class GMPPackingHarvestToolLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-harvest-tool')
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
      day_num: [this.dataResolver.resolveNumber(day.day_num), [Validators.required]],
      types: this._fb.array([])
    })

    const control = <FormArray>captureDayGroup.controls['types']
    for (let type of day.types) {
      control.push(this.initType(type))
    }

    return captureDayGroup
  }

  initType(type: LogType): FormGroup {
    let captureTypeGroup: FormGroup = this._fb.group({
      type_id: [this.dataResolver.resolveNumber(type.type_id), [Validators.required]],
      issue_time: [this.dataResolver.resolveString(type.issue_time), []],
      issue_qty: [this.dataResolver.resolveNumber(type.issue_qty), []],
      issue_conditions: [this.dataResolver.resolveBoolean(type.issue_conditions), []],
      recovery_time: [this.dataResolver.resolveString(type.recovery_time), []],
      recovery_qty: [this.dataResolver.resolveNumber(type.recovery_qty), []],
      recovery_conditions: [this.dataResolver.resolveBoolean(type.recovery_conditions), []],
      sanitation: [this.dataResolver.resolveNumber(type.sanitation), []],
      deficiencies: [this.dataResolver.resolveString(type.deficiencies), [Validators.maxLength(this.maxLengths.deficiencies)]],
      corrective_actions: [this.dataResolver.resolveString(type.corrective_actions), [Validators.maxLength(this.maxLengths.corrective_actions)]]
    })

    return captureTypeGroup
  }

  onEntryAdd() {
    const control = <FormArray>this.captureForm.controls['days']

    let types: Array<LogType> = []

    for (let type of this.log.days[0].types) {
      types.push({ type_id: Number(type.type_id), name_en: String(type.name_en), name_es: String(type.name_es) })
    }

    let day: LogDay = {
      date: '',
      day_num: control.controls.length + 1,
      types: types
    }
    
    this.log.days.push(day)
    control.push(this.initDay(day))
  }

  cleanForm() {
    for (let d in (<FormGroup>this.captureForm.controls.days).controls) {
      const day = (<FormGroup>(<FormGroup>this.captureForm.controls.days).controls[d])
      for (let t in (<FormGroup>day.controls.types).controls) {
        const type = (<FormGroup>(<FormGroup>day.controls.types).controls[t])
        
        let controlArray: Array<AbstractControl> = []

        controlArray.push(type.controls.issue_time)
        controlArray.push(type.controls.issue_qty)
        controlArray.push(type.controls.issue_conditions)
        controlArray.push(type.controls.recovery_time)
        controlArray.push(type.controls.recovery_qty)
        controlArray.push(type.controls.recovery_conditions)
        controlArray.push(type.controls.sanitation)
        controlArray.push(type.controls.deficiencies)
        controlArray.push(type.controls.corrective_actions)

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