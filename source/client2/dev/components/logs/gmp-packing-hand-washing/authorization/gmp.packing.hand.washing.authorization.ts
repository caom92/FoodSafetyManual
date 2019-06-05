import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.hand.washing.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.hand.washing.update.interface'

@Component({
  selector: 'gmp-packing-hand-washing-authorization',
  templateUrl: './gmp.packing.hand.washing.authorization.html'
})

export class GMPPackingHandWashingAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization

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
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
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
