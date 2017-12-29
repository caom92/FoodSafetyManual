import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { NavParams, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { UpdateLog, UpdateItem } from '../interfaces/gmp.packing.thermo.calibration.update.interface'
import { Authorization } from '../interfaces/gmp.packing.thermo.calibration.authorization.interface'

import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

import { NavbarPageComponent } from '../../../super-components/navbar.component'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-thermo-calibration-authorization',
  templateUrl: './gmp.packing.thermo.calibration.authorization.html'
})

export class GMPPackingThermoCalibrationAuthorizationComponent extends NavbarPageComponent implements OnInit {
  @Input()
  log: Authorization = {
    report_id: null,
    created_by: null,
    approved_by: null,
    creation_date: null,
    approval_date: null,
    zone_name: null,
    program_name: null,
    module_name: null,
    log_name: null,
    time: null,
    items: [{
      id: null,
      name: null,
      test: null,
      calibration: null,
      sanitization: null,
      deficiencies: null,
      corrective_action: null
    }]
  }

  @Language() lang: string

  public captureForm: FormGroup = new FormBuilder().group({})

  logHeaderData = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }

  constructor(private _fb: FormBuilder,
    public server: BackendService,
    public translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
    public events: Events,
    public storage: Storage,
    public logService: LogService) {
    super(translationService, events, storage, server)
    this.log = navParams.get('data');
  }

  ngOnInit() {
    super.ngOnInit()

    this.assignHeaderData()

    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
      time: [this.log.time, [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: item.test, calibration: (item.calibration == 1) ? true : false, sanitization: (item.sanitization == 1) ? true : false, deficiencies: item.deficiencies, corrective_action: item.corrective_action }))
    }
  }

  assignHeaderData() {
    this.logHeaderData.created_by = this.log.created_by
    this.logHeaderData.date = this.log.creation_date
    this.logHeaderData.module_name = this.log.module_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.zone_name = this.log.zone_name
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

  save(model: UpdateLog) {
    if (this.captureForm.valid) {
      this.logService.update(this.captureForm.value, 'update-gmp-packing-thermo-calibration').then(success => {
        // Si la promesa regresa como valida, quiere decir que la bitácora fue enviada con éxito

      }, error => {
        // Caso contrario, se le notifica al usuario
      })
    } else {
      this.toasts.showText("incompleteLog")
    }
  }
}
