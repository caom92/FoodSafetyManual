import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.scissors.knives.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.scissors.knives.update.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-authorization',
  templateUrl: './gmp.packing.scissors.knives.authorization.html'
})

export class GMPPackingScissorsKnivesAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, items: [{ id: null, name: null, time: null, quantity: null, approved: null, condition: null, corrective_action: null, is_sanitized: null }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, router: StateService) {
    super(_fb, logService, toastService, router)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-scissors-knives")
    super.ngOnInit()
    this.initForm()
  }


  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
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
