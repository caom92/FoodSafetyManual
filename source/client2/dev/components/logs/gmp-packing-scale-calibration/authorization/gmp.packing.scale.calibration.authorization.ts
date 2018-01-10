import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { Language } from 'angular-l10n'

import { Authorization } from '../interfaces/gmp.packing.scale.calibration.authorization.interface'
import { UpdateType, UpdateItem } from '../interfaces/gmp.packing.scale.calibration.update.interface'

import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'

@Component({
  selector: 'gmp-packing-scale-calibration-authorization',
  templateUrl: './gmp.packing.scale.calibration.authorization.html'
})

export class GMPPackingScaleCalibrationAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, corrective_action: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, time: null, items: [{ id: null, position: null, name: null, test: null, unit: null, status: null, is_sanitized: null }] }] } }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService) {
    super(_fb, logService, toastService)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-scale-calibration")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
      notes: [this.log.notes, [Validators.required, Validators.minLength(1)]],
      corrective_action: [this.log.corrective_action, [Validators.required, Validators.minLength(1)]],
      types: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['types'];
    for (let type of this.log.types.scales) {
      let itemControl = []
      for (let item of type.items) {
        itemControl.push(this.initItem({ id: item.id, test: item.test, unit_id: item.unit, status: (item.status == 1) ? true : false, is_sanitized: (item.is_sanitized == 1) ? true : false }))
      }
      control.push(this.initType({ id: type.id, time: type.time, items: itemControl }))
    }
  }

  initType(type: UpdateType) {
    return this._fb.group({
      id: [type.id, [Validators.required]],
      time: [type.time, [Validators.required]],
      items: this._fb.array(type.items)
    })
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      unit_id: [item.unit_id, [Validators.required]],
      status: [item.status, [Validators.required]],
      is_sanitized: [item.is_sanitized, []]
    })
  }
}
