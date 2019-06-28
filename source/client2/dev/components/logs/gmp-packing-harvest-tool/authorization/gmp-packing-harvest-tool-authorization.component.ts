import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp-packing-harvest-tool-authorization.interface'
import { LogDay, LogType } from '../interfaces/gmp-packing-harvest-tool-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gmp-packing-harvest-tool-authorization',
  templateUrl: './gmp-packing-harvest-tool-authorization.component.html'
})

export class GMPPackingHarvestToolAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization
  
  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router, private dataResolver: DataResolverService) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gmp-packing-harvest-tool')
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
}