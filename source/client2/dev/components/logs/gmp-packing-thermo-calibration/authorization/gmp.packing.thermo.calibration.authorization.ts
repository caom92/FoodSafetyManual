import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.thermo.calibration.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.thermo.calibration.update.interface'

@Component({
  selector: 'gmp-packing-thermo-calibration-authorization',
  templateUrl: './gmp.packing.thermo.calibration.authorization.html'
})

export class GMPPackingThermoCalibrationAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, creation_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, time: null, items: [{ id: null, name: null, test: null, calibration: null, sanitization: null, deficiencies: null, corrective_action: null }] }
  @Language() lang: string

  readonly maxLengths = {
    deficiencies: 65535,
    corrective_action: 65535
  }

  constructor(private langManager: LanguageService, _fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-thermo-calibration')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      time: [this.log.time, [Validators.required, CustomValidators.timeValidator()]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: item.test, calibration: (item.calibration == 1) ? true : false, sanitization: (item.sanitization == 1) ? true : false, deficiencies: item.deficiencies, corrective_action: item.corrective_action }))
    }
  }

  initItem(item: UpdateItem) {
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
