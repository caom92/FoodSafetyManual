import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'

import { Language } from 'angular-l10n'

import { Log } from '../interfaces/gap.packing.preop.log.interface'
import { CaptureArea, CaptureItem } from '../interfaces/gap.packing.preop.capture.interface'

import { DateTimeService } from '../../../../services/app.time'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperLogComponent } from '../../super-logs/super.logs.log'

@Component({
  selector: 'gap-packing-preop-log',
  templateUrl: './gap.packing.preop.log.html'
})

export class GAPPackingPreopLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gap-packing-preop")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.maxLength(65535)]],
      album_url: ['', [Validators.maxLength(65535)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas'];
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
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      notes: '',
      album_url: '',
      areas: areas
    })
  }

  initArea(area: CaptureArea) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required]],
      notes: [area.notes, [Validators.required, Validators.maxLength(65535)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(255)]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]],
      corrective_action_id: [item.corrective_action],
      comment: [item.comment, [Validators.maxLength(65535)]]
    })
  }
}