import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gap.packing.preop.authorization.interface'
import { UpdateArea, UpdateItem } from '../interfaces/gap.packing.preop.update.interface'

@Component({
  selector: 'gap-packing-preop-authorization',
  templateUrl: './gap.packing.preop.authorization.html'
})

export class GAPPackingPreopAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization

  readonly maxLengths = {
    area_notes: 65535,
    person_performing_sanitation: 255,
    comment: 65535,
    report_notes: 65535,
    album_url: 255
  }

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-preop')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      subject: [this.log.subject, [Validators.maxLength(65535)]],
      notes: [this.log.notes, [Validators.maxLength(this.maxLengths.report_notes)]],
      album_url: [this.log.album_url, [Validators.maxLength(this.maxLengths.album_url)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas.logs) {
      let itemControl = []
      for (let type of area.types) {
        for (let item of type.items) {
          itemControl.push(this.initItem({ id: item.id, is_acceptable: (item.status == 1) ? true : (item.status == 0) ? false : null, corrective_action_id: item.corrective_action_id, comment: item.comment }))
        }
      }
      control.push(this.initArea({ id: area.id, time: area.time, notes: area.notes, person_performing_sanitation: area.person_performing_sanitation, items: itemControl }))
    }
  }

  initArea(area: UpdateArea) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required, CustomValidators.timeValidator()]],
      notes: [area.notes, [Validators.maxLength(this.maxLengths.area_notes)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(this.maxLengths.person_performing_sanitation)]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable],
      corrective_action_id: [item.corrective_action_id],
      comment: [item.comment, [Validators.maxLength(this.maxLengths.comment)]]
    })
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.is_acceptable.value == false) {
          item.enable()
        } else if (item.controls.is_acceptable.value == true || item.controls.is_acceptable.value == undefined || item.controls.is_acceptable.value == null) {
          if (item.controls.is_acceptable.value == undefined || item.controls.is_acceptable.value == null) {
            item.controls.is_acceptable.disable()
          }
          item.controls.corrective_action_id.disable()
          item.controls.comment.disable()
        }
      }
    }
  }

  public enableForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        item.enable()
      }
    }
  }
}
