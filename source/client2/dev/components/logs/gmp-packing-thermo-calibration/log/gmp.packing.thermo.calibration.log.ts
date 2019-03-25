import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.thermo.calibration.capture.interface'
import { Log } from '../interfaces/gmp.packing.thermo.calibration.log.interface'

@Component({
  selector: 'gmp-packing-thermo-calibration-log',
  templateUrl: './gmp.packing.thermo.calibration.log.html'
})

export class GMPPackingThermoCalibrationLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, position: null }] }
  @Language() lang: string

  readonly maxLengths = {
    deficiencies: 65535,
    corrective_action: 65535
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService) {
    super(logService, toastService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-thermo-calibration')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      time: [currentTime, [Validators.required, CustomValidators.timeValidator()]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: '', corrective_action: '' }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: '', corrective_action: '' })
    }
    this.captureForm.reset({
      date: currentDate,
      time: currentTime,
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      calibration: [item.calibration, [Validators.required]],
      sanitization: [item.sanitization, [Validators.required]],
      deficiencies: [item.deficiencies, [Validators.required, Validators.maxLength(this.maxLengths.deficiencies)]],
      corrective_action: [item.corrective_action, [Validators.required, Validators.maxLength(this.maxLengths.corrective_action)]]
    })
  }
}