import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gap-packing-harvest-tool-authorization.interface'
import { LogDay, LogTool } from '../interfaces/gap-packing-harvest-tool-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gap-packing-harvest-tool-authorization',
  templateUrl: './gap-packing-harvest-tool-authorization.component.html'
})

export class GAPPackingHarvestToolAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization
  
  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router, private dataResolver: DataResolverService) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gap-packing-harvest-tool')
    super.ngOnInit()
  }

  initForm(): void {
    super.initForm()

    const daysControl: FormArray = this._fb.array([])
    for (let day of this.log.days) {
      daysControl.push(this.initDay(day))
    }

    this.captureForm.addControl('days', daysControl)
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
      corrective_actions: [this.dataResolver.resolveString(tool.corrective_actions), [Validators.required, Validators.maxLength(this.maxLengths.corrective_actions)]],
      is_captured: [this.dataResolver.resolveBoolean(tool.is_captured), [Validators.required]]
    })

    return captureTypeGroup
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
}