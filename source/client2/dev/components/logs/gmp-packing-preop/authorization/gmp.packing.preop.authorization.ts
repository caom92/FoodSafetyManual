import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.preop.authorization.interface'
import { UpdateArea, UpdateItem } from '../interfaces/gmp.packing.preop.update.interface'

@Component({
  selector: 'gmp-packing-preop-authorization',
  templateUrl: './gmp.packing.preop.authorization.html'
})

export class GMPPackingPreopAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-preop')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      subject: [this.log.subject, [Validators.maxLength(65535)]],
      notes: [this.log.notes, [Validators.maxLength(65535)]],
      album_url: [this.log.album_url, [Validators.maxLength(65535)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas.logs) {
      let itemControl = []
      for (let type of area.types) {
        for (let item of type.items) {
          itemControl.push(this.initItem({ id: item.id, is_acceptable: (item.status == 1) ? true : false, corrective_action_id: item.corrective_action_id, comment: item.comment }))
        }
      }
      control.push(this.initArea({ id: area.id, time: area.time, notes: area.notes, person_performing_sanitation: area.person_performing_sanitation, items: itemControl }))
    }
  }

  initArea(area: UpdateArea) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required, Validators.minLength(1)]],
      notes: [area.notes, [Validators.maxLength(65535)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(255)]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]],
      corrective_action_id: [item.corrective_action_id],
      comment: [item.comment, [Validators.maxLength(65535)]]
    })
  }
}
