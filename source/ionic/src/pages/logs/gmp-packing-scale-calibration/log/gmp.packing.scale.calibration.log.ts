// Angular

import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

// Ionic

import { NavParams } from 'ionic-angular'

// Other

import { Language } from 'angular-l10n'

// Interfaces

import { CaptureLog, CaptureType, CaptureItem } from '../interfaces/gmp.packing.scale.calibration.capture.interface'
import { Log, LogItem, LogType, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'
import { LogDetails, LogHeaderData } from '../../log.interfaces'

// Services

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-scale-calibration-log',
  templateUrl: './gmp.packing.scale.calibration.log.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingScaleCalibrationLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, items: [{ id: null, name: null, position: null }] }] } }
  @Language() lang: string
  logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  public gmpPackingScaleCalibrationForm: FormGroup = new FormBuilder().group({})

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private server: BackendService,
    private translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
    private loaderService: LoaderService,
    public logService: LogService) {
    this.log = navParams.get('data')
  }

  ngOnInit() {
    // Llenamos los datos del encabezado que saldrá desplegado en la tarjeta; los datos de fecha y
    // elaborador son llenados automáticamente por el componente de encabezado
    this.logHeaderData.zone_name = this.log.zone_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.module_name = this.log.module_name

    // Creamos el formulario, utilizando validaciones equivalentes a las usadas en el servidor
    this.gmpPackingScaleCalibrationForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      corrective_action: ['', [Validators.required, Validators.minLength(1)]],
      types: this._fb.array([])
    })
    const control = <FormArray>this.gmpPackingScaleCalibrationForm.controls['types'];
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
    this.gmpPackingScaleCalibrationForm.reset({
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

  save() {
    if (this.gmpPackingScaleCalibrationForm.valid) {
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.gmpPackingScaleCalibrationForm.value, 'capture-gmp-packing-scale-calibration', logDetails).then(success => {
        // Una vez que la promesa fue cumplida, reiniciamos el formulario
        this.resetForm()
      })
    } else {
      this.toasts.showText("incompleteLog")
    }
  }
}