import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem, CaptureType } from '../interfaces/gmp.packing.scale.calibration.capture.interface'
import { Log } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
  selector: 'gmp-packing-scale-calibration-log',
  templateUrl: './gmp.packing.scale.calibration.log.html'
})

export class GMPPackingScaleCalibrationLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, items: [{ id: null, name: null, position: null }] }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationConfig: TranslationConfigService,
    logService: LogService,
    toastService: ToastsService) {
    super(logService, toastService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-scale-calibration')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.maxLength(65535)]],
      corrective_action: ['', [Validators.maxLength(65535)]],
      types: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['types']
    for (let type of this.log.types.scales) {
      let itemControl = []
      for (let item of type.items) {
        itemControl.push(this.initItem({ id: item.id, test: null, unit_id: this.log.types.units[0].id, quantity: null, status: true, is_sanitized: false }))
      }
      control.push(this.initType({ id: type.id, time: currentTime, items: itemControl }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    let types = []
    for (let type of this.log.types.scales) {
      let items = []
      for (let item of type.items) {
        items.push({ id: item.id, test: null, unit_id: this.log.types.units[0].id, quantity: null, status: true, is_sanitized: false })
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
      quantity: [item.quantity],
      status: [item.status, [Validators.required]],
      is_sanitized: [item.is_sanitized, []]
    })
  }

  public cleanForm(): void {
    for (let t in (<FormGroup>this.captureForm.controls.types).controls) {
      const type = (<FormGroup>(<FormGroup>this.captureForm.controls.types).controls[t])
      for (let i in (<FormGroup>type.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>type.controls.items).controls[i])
        const quantityControl = (<FormGroup>item).controls.quantity
        const unitControl = (<FormGroup>item).controls.unit_id

        if (quantityControl.value === null || quantityControl.value === '') {
          quantityControl.disable()
        }

        if (unitControl.value === null || unitControl.value === '') {
          unitControl.disable()
        }
      }
    }
  }

  public enableForm(): void {
    for (let t in (<FormGroup>this.captureForm.controls.types).controls) {
      const type = (<FormGroup>(<FormGroup>this.captureForm.controls.types).controls[t])
      for (let i in (<FormGroup>type.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>type.controls.items).controls[i])
        const quantityControl = (<FormGroup>item).controls.quantity
        const unitControl = (<FormGroup>item).controls.unit_id

        quantityControl.enable()
        unitControl.enable()
      }
    }
  }
}