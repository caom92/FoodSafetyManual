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
import { Log, LogDay, LogTool } from '../interfaces/gap-packing-harvest-tool-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gap-packing-harvest-tool-log',
  templateUrl: './gap-packing-harvest-tool-log.component.html'
})

export class GAPPackingHarvestToolLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-harvest-tool')
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
      tools: this._fb.array([])
    })

    const control = <FormArray>captureDayGroup.controls['tools']
    for (let tool of day.tools) {
      control.push(this.initTool(tool))
    }

    return captureDayGroup
  }

  initTool(tool: LogTool): FormGroup {
    let captureTypeGroup: FormGroup = this._fb.group({
      tool_id: [this.dataResolver.resolveNumber(tool.tool_id), [Validators.required]],
      issue_time: [this.dataResolver.resolveString(tool.issue_time), [Validators.required, CustomValidators.timeValidator()]],
      issue_qty: [this.dataResolver.resolveNumber(tool.issue_qty), [Validators.required]],
      issue_conditions: [this.dataResolver.resolveNumber(tool.issue_conditions), [Validators.required]],
      recovery_time: [this.dataResolver.resolveString(tool.recovery_time), [Validators.required, CustomValidators.timeValidator()]],
      recovery_qty: [this.dataResolver.resolveNumber(tool.recovery_qty), [Validators.required]],
      recovery_conditions: [this.dataResolver.resolveNumber(tool.recovery_conditions), [Validators.required]],
      sanitation: [this.dataResolver.resolveNumber(tool.sanitation), [Validators.required]],
      deficiencies: [this.dataResolver.resolveString(tool.deficiencies), [Validators.required, Validators.maxLength(this.maxLengths.deficiencies)]],
      corrective_actions: [this.dataResolver.resolveString(tool.corrective_actions), [Validators.required, Validators.maxLength(this.maxLengths.corrective_actions)]]
    })

    return captureTypeGroup
  }

  onEntryAdd() {
    const control = <FormArray>this.captureForm.controls['days']

    let tools: Array<LogTool> = []

    for (let tool of this.log.days[0].tools) {
      tools.push({ tool_id: Number(tool.tool_id), name: String(tool.name) })
    }

    let day: LogDay = {
      date: '',
      day_num: control.controls.length + 1,
      tools: tools
    }
    
    this.log.days.push(day)
    control.push(this.initDay(day))
  }

  cleanForm() {
    /*for (let d in (<FormGroup>this.captureForm.controls.days).controls) {
      const day = (<FormGroup>(<FormGroup>this.captureForm.controls.days).controls[d])
      for (let t in (<FormGroup>day.controls.tools).controls) {
        const tool = (<FormGroup>(<FormGroup>day.controls.tools).controls[t])
        
        let controlArray: Array<AbstractControl> = []

        controlArray.push(tool.controls.issue_time)
        controlArray.push(tool.controls.issue_qty)
        controlArray.push(tool.controls.issue_conditions)
        controlArray.push(tool.controls.recovery_time)
        controlArray.push(tool.controls.recovery_qty)
        controlArray.push(tool.controls.recovery_conditions)
        controlArray.push(tool.controls.sanitation)
        controlArray.push(tool.controls.deficiencies)
        controlArray.push(tool.controls.corrective_actions)

        for (let control of controlArray) {
          if (control.value === null || control.value === '') {
            control.disable()
          }
        }
      }
    }*/
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