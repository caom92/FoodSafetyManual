import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem, CaptureType } from '../interfaces/gmp.packing.scale.calibration.capture.interface'
import { Log } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-log',
  templateUrl: './gmp.packing.scale.calibration.log.html'
})

export class GMPPackingScaleCalibrationLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, items: [{ id: null, name: null, position: null }] }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-scale-calibration")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {    
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      corrective_action: ['', [Validators.required, Validators.minLength(1)]],
      types: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['types'];
    let currentTime = this.timeService.getISOTime(new Date())
    for (let type of this.log.types.scales) {
      let itemControl = []
      for (let item of type.items) {
        itemControl.push(this.initItem({ id: item.id, test: null, unit_id: null, status: null, is_sanitized: false }))
      }
      control.push(this.initType({ id: type.id, time: currentTime, items: itemControl }))
    }
  }

  resetForm() {
    let types = []
    let currentTime = this.timeService.getISOTime(new Date())
    for (let type of this.log.types.scales) {
      let items = []
      for (let item of type.items) {
        items.push({ id: item.id, test: null, unit_id: null, status: null, is_sanitized: false })
      }
      types.push({ id: type.id, time: currentTime, items: items })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      notes: '',
      corrective_action: '',
      types: types
    })
  }

  initType(type: CaptureType) {
    return this._fb.group({
      id: [type.id, [Validators.required]],
      time: [type.time, [Validators.required]],
      items: this._fb.array(type.items)
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      unit_id: [item.unit_id, [Validators.required]],
      status: [item.status, [Validators.required]],
      is_sanitized: [item.is_sanitized, []]
    })
  }
}