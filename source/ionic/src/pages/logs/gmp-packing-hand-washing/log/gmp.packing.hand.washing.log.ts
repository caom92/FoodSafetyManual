// Angular

import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

// Ionic

import { NavParams } from 'ionic-angular'

// Other

import { Language } from 'angular-l10n'

// Interfaces

import { CaptureLog, CaptureItem } from '../interfaces/gmp.packing.hand.washing.capture.interface'
import { Log, LogItem } from '../interfaces/gmp.packing.hand.washing.log.interface'
import { LogDetails, LogHeaderData } from '../../log.interfaces'

// Services

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-hand-washing-log',
  templateUrl: './gmp.packing.hand.washing.log.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class GMPPackingHandWashingLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
  @Language() lang: string
  logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }

  public gmpPackingHandWashingForm: FormGroup = new FormBuilder().group({})

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private server: BackendService,
    private translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
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
    this.gmpPackingHandWashingForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.gmpPackingHandWashingForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, is_acceptable: false }))
    }
  }

  resetForm() {
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, is_acceptable: false })
    }
    this.gmpPackingHandWashingForm.reset({
      date: this.timeService.getISODate(new Date()),
      notes: '',
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }

  save() {
    if (this.gmpPackingHandWashingForm.valid) {
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.gmpPackingHandWashingForm.value, 'capture-gmp-packing-hand-washing', logDetails).then(success => {
        // Una vez que la promesa fue cumplida, reiniciamos el formulario
        this.resetForm()
      })
    } else {
      this.toasts.showText("incompleteLog")
    }
  }
}