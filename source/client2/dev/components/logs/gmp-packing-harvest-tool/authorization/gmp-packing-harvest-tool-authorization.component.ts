import { Component } from '@angular/core'
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp-packing-harvest-tool-authorization.interface'
import { maxLengths } from '../max-lengths/max-lengths'
import { LogDay, LogType } from '../interfaces/gmp-packing-harvest-tool-log.interface';

@Component({
  selector: 'gmp-packing-harvest-tool-authorization',
  templateUrl: './gmp-packing-harvest-tool-authorization.component.html'
})

export class GMPPackingHarvestToolAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization
  
  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router) {
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
      date: [day.date, [Validators.required, CustomValidators.dateValidator()]],
      day_num: [day.day_num, [Validators.required]],
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
      type_id: [type.type_id, [Validators.required]],
      issue_time: [type.issue_time, [Validators.required]],
      issue_qty: [type.issue_qty, [Validators.required]],
      issue_conditions: [type.issue_conditions, [Validators.required]],
      recovery_time: [type.recovery_time, [Validators.required]],
      recovery_qty: [type.recovery_qty, [Validators.required]],
      recovery_conditions: [type.recovery_conditions, [Validators.required]],
      sanitation: [type.sanitation, [Validators.required]],
      deficiencies: [type.deficiencies, [Validators.required, Validators.maxLength(this.maxLengths.deficiencies)]],
      corrective_actions: [type.corrective_actions, [Validators.required, Validators.maxLength(this.maxLengths.corrective_actions)]]
    })

    return captureTypeGroup
  }
}