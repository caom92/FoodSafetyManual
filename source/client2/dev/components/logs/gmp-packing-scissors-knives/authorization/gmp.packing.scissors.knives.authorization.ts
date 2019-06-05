import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.scissors.knives.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.scissors.knives.update.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-authorization',
  templateUrl: './gmp.packing.scissors.knives.authorization.html'
})

export class GMPPackingScissorsKnivesAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-scissors-knives')
    super.ngOnInit()
    this.initForm()
  }


  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      notes: [this.log.notes, [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({id:item.id,time:item.time,approved: (item.approved == 1) ? true : false,condition:(item.condition == 1) ? true : false,is_sanitized:(item.is_sanitized == 1) ? true : false,corrective_action:item.corrective_action}))
    }
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      time: [item.time, [Validators.required]],
      approved: [item.approved],
      condition: [item.condition],
      is_sanitized: [item.is_sanitized],
      corrective_action: [item.corrective_action]
    })
  }
}
