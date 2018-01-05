import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { Language } from 'angular-l10n'

import { Log } from '../interfaces/gmp.packing.thermo.calibration.log.interface'
import { CaptureItem } from '../interfaces/gmp.packing.thermo.calibration.capture.interface'

import { DateTimeService } from '../../../../services/app.time'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperLogComponent } from '../../super-logs/super.logs.log'

@Component({
  selector: 'gmp-packing-thermo-calibration-log',
  templateUrl: './gmp.packing.thermo.calibration.log.html'
})

export class GMPPackingThermoCalibrationLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, position: null }] }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toasts: ToastService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-thermo-calibration")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    // Creamos el formulario, utilizando validaciones equivalentes a las usadas en el servidor
    let currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      time: [currentTime, [Validators.required]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: "", corrective_action: "" }))
    }
  }

  resetForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: "", corrective_action: "" })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      calibration: [item.calibration],
      sanitization: [item.sanitization],
      deficiencies: [item.deficiencies],
      corrective_action: [item.corrective_action]
    })
  }
}