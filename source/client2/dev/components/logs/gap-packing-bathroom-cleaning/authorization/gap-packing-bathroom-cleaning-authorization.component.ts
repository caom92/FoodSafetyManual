import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gap-packing-bathroom-cleaning-authorization.interface'
import { LogDay, LogItem } from '../interfaces/gap-packing-bathroom-cleaning-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gap-packing-bathroom-cleaning-authorization',
  templateUrl: './gap-packing-bathroom-cleaning-authorization.component.html'
})

export class GAPPackingBathroomCleaningAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization

  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router, private dataResolver: DataResolverService) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gap-packing-bathroom-cleaning')
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

  cleanForm() {
    for (let d in (<FormGroup>this.captureForm.controls.days).controls) {
      const day = (<FormGroup>(<FormGroup>this.captureForm.controls.days).controls[d])
      for (let t in (<FormGroup>day.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>day.controls.items).controls[t])

        let controlArray: Array<AbstractControl> = []

        controlArray.push(item.controls.issue_time)
        controlArray.push(item.controls.issue_qty)
        controlArray.push(item.controls.issue_conditions)
        controlArray.push(item.controls.recovery_time)
        controlArray.push(item.controls.recovery_qty)
        controlArray.push(item.controls.recovery_conditions)
        controlArray.push(item.controls.sanitation)
        controlArray.push(item.controls.deficiencies)
        controlArray.push(item.controls.corrective_actions)

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