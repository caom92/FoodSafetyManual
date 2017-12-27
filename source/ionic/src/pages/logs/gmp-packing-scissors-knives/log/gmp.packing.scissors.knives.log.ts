import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { NavParams } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { CaptureItem } from '../interfaces/gmp.packing.scissors.knives.capture.interface'
import { Log } from '../interfaces/gmp.packing.scissors.knives.log.interface'
import { LogDetails, LogHeaderData } from '../../log.interfaces'

import { DateTimeService } from '../../../../services/app.time'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-scissors-knives-log',
  templateUrl: './gmp.packing.scissors.knives.log.html'
})

export class GMPPackingScissorsKnivesLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, quantity: null }] }
  @Language() lang: string
  public logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  public gmpPackingScissorsKnivesForm: FormGroup = new FormBuilder().group({})

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
    public logService: LogService) {
    
  }

  ngOnInit() {
    this.log = this.navParams.get('data')
    // Llenamos los datos del encabezado que saldrá desplegado en la tarjeta; los datos de fecha y
    // elaborador son llenados automáticamente por el componente de encabezado
    this.logHeaderData.zone_name = this.log.zone_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.module_name = this.log.module_name

    this.initForm()
  }

  initForm() {
    this.gmpPackingScissorsKnivesForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.gmpPackingScissorsKnivesForm.controls['items'];
    let currentTime = this.timeService.getISOTime(new Date())
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, time: currentTime, approved: false, condition: false, is_sanitized: false, corrective_action: "" }))
    }
  }

  resetForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, time: currentTime, approved: false, condition: false, is_sanitized: false, corrective_action: "" })
    }
    this.gmpPackingScissorsKnivesForm.reset({
      date: this.timeService.getISODate(new Date()),
      notes: '',
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      time: [item.time, [Validators.required]],
      approved: [item.approved],
      condition: [item.condition],
      is_sanitized: [item.is_sanitized],
      corrective_action: [item.corrective_action]
    })
  }

  save() {
    if (this.gmpPackingScissorsKnivesForm.valid) {
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.gmpPackingScissorsKnivesForm.value, 'capture-gmp-packing-scissors-knives', logDetails).then(success => {
        // Una vez que la promesa fue cumplida, reiniciamos el formulario
        this.resetForm()
      })
    } else {
      this.toasts.showText("incompleteLog")
    }
  }
}