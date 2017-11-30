import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'
import { CapturedLog, Area, Item } from '../gmp.packing.preop.interface'
import { LogDetails, LogHeaderData } from '../../log.interfaces'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-preop-log',
  templateUrl: './gmp.packing.preop.log.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class GMPPackingPreopLogComponent implements OnInit {
  @Input()
  log: {
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    html_footer: string,
    areas: {
      corrective_actions: Array<{
        id: number,
        code: string,
        en: string,
        es: string
      }>
      logs: Array<{
        id: number,
        name: string,
        types: Array<{
          id: number,
          name: string,
          items: Array<{
            id: number,
            name: string,
            order: number
          }>
        }>
      }>
    }
  } = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] }] } }

  logHeaderData: LogHeaderData = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }

  @Language()
  lang: string

  public gmpPackingPreopForm: FormGroup = new FormBuilder().group({})

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private server: BackendService,
    private translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
    private logService: LogService) {
    this.log = navParams.get('data')
  }

  ngOnInit() {
    // Llenamos los datos del encabezado que saldrá desplegado en la tarjeta; los datos de fecha y
    // elaborador son llenados automáticamente por el componente de encabezado
    this.logHeaderData.zone_name = this.log.zone_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.module_name = this.log.module_name

    // Creamos el formulario, utilizando validaciones equivalentes a las usadas en el servidor
    this.gmpPackingPreopForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.maxLength(65535)]],
      album_url: ['', [Validators.maxLength(65535)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.gmpPackingPreopForm.controls['areas'];
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas.logs) {
      let itemControl = []
      for (let type of area.types) {
        for (let item of type.items) {
          itemControl.push(this.initItem({ id: item.id, is_acceptable: null, corrective_action: 1, comment: "" }))
        }
      }
      control.push(this.initArea({ id: area.id, time: currentTime, notes: "", person_performing_sanitation: "", items: itemControl }))
    }
    console.log(this.gmpPackingPreopForm)
  }

  resetForm() {
    let areas = []
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas.logs) {
      let items = []
      for(let type of area.types){
        for(let item of type.items){
          items.push({ id: item.id, is_acceptable: null, corrective_action: 1, comment: "" })
        }
      }
      areas.push({ id: area.id, time: currentTime, notes: "", person_performing_sanitation: "", items: items })
    }
    this.gmpPackingPreopForm.reset({
      date: this.timeService.getISODate(new Date()),
      notes: '',
      album_url: '',
      areas: areas
    })
  }

  initArea(area: Area) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required]],
      notes: [area.notes, [Validators.maxLength(65535)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(255)]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: Item) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]],
      corrective_action_id: [item.corrective_action],
      comment: [item.comment, [Validators.maxLength(65535)]]
    })
  }

  save() {
    if (this.gmpPackingPreopForm.valid) {
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.gmpPackingPreopForm.value, 'capture-gmp-packing-scale-calibration', logDetails).then(success => {
        // Una vez que la promesa fue cumplida, reiniciamos el formulario
        this.resetForm()
      })
    } else {
      // Marcamos el formulario completo como "sucio" para que aparezcan los
      // mensajes de error en la vista donde sea pertinente
      this.logService.setAsDirty(this.gmpPackingPreopForm)
      this.toasts.showText("incompleteLog")
    }
  }
}