import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureArea, CaptureItem } from '../interfaces/gmp.packing.glass.brittle.capture.interface'
import { Log } from '../interfaces/gmp.packing.glass.brittle.log.interface'
import { LanguageService } from '../../../../services/app.language';

@Component({
  selector: 'gmp-packing-glass-brittle-log',
  templateUrl: './gmp.packing.glass.brittle.log.html'
})

export class GMPPackingGlassBrittleLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, quantity: null }] }] }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-glass-brittle")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      time: [this.timeService.getISOTime(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas) {
      console.log("area of log")
      let itemControl = []
      for (let item of area.items) {
        console.log("item of area")
        itemControl.push(this.initItem({ id: item.id, is_acceptable: null }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  resetForm() {
    let areas = []
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas) {
      let items = []
      for (let item of area.items) {
        items.push({ id: item.id, is_acceptable: null })
      }
      areas.push({ id: area.id, items: items })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      notes: '',
      areas: areas
    })
  }

  initArea(area: CaptureArea) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }
}