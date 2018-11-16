import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.hand.washing.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.hand.washing.update.interface'

@Component({
  selector: 'gmp-packing-hand-washing-authorization',
  templateUrl: './gmp.packing.hand.washing.authorization.html'
})

export class GMPPackingHandWashingAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, items: [{ id: null, name: null, is_acceptable: null }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  readonly maxLengths = {
    notes: 65535
  }

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-hand-washing')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      notes: [this.log.notes, [Validators.maxLength(this.maxLengths.notes)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: Number(item.id), is_acceptable: item.is_acceptable == '1' }))
    }
  }

  public initItem(item: UpdateItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }
}
