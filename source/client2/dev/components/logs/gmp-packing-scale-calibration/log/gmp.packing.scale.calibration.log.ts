import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { Language, TranslationService as TS } from 'angular-l10n'

import { CaptureType, CaptureItem } from '../interfaces/gmp.packing.scale.calibration.capture.interface'
import { Log } from '../interfaces/gmp.packing.scale.calibration.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { TranslationService } from '../../../../services/app.translation'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CustomValidators } from '../../../../directives/custom.validators';
import { Http } from '@angular/http';

@Component({
  selector: 'gmp-packing-scale-calibration-log',
  templateUrl: './gmp.packing.scale.calibration.log.html'
})

export class GMPPackingScaleCalibrationLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, items: [{ id: null, name: null, position: null }] }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-scale-calibration")
    super.ngOnInit()
    this.initForm()

    /*this.ts.translationChanged.subscribe(
      () => {
        window.setTimeout(() => {
          console.log("material select")
          $("select").material_select()
        }, 20)
      }
    )*/
  }

  initForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.maxLength(65535)]],
      corrective_action: ['', [Validators.maxLength(65535)]],
      types: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['types'];
    for (let type of this.log.types.scales) {
      let itemControl = []
      for (let item of type.items) {
        itemControl.push(this.initItem({ id: item.id, test: null, unit_id: this.log.types.units[0].id, status: true, is_sanitized: false }))
      }
      control.push(this.initType({ id: type.id, time: currentTime, items: itemControl }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    let types = []
    for (let type of this.log.types.scales) {
      let items = []
      for (let item of type.items) {
        items.push({ id: item.id, test: null, unit_id: this.log.types.units[0].id, status: true, is_sanitized: false })
      }
      types.push({ id: type.id, time: currentTime, items: items })
    }
    this.captureForm.reset({
      date: currentDate,
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