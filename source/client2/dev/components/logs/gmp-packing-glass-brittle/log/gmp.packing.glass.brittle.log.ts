import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureArea, CaptureItem } from '../interfaces/gmp.packing.glass.brittle.capture.interface'
import { Log } from '../interfaces/gmp.packing.glass.brittle.log.interface'
import { CustomValidators } from '../../../../directives/custom.validators';

@Component({
  selector: 'gmp-packing-glass-brittle-log',
  templateUrl: './gmp.packing.glass.brittle.log.html'
})

export class GMPPackingGlassBrittleLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, quantity: null }] }] }
  @Language() lang: string

  readonly maxLengths = {
    notes: 65535
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-glass-brittle")
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, CustomValidators.dateValidator()]],
      time: [this.timeService.getISOTime(new Date()), [Validators.required, CustomValidators.timeValidator()]],
      notes: ['', [Validators.required, Validators.maxLength(this.maxLengths.notes)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas) {
      let itemControl = []
      for (let item of area.items) {
        itemControl.push(this.initItem({ id: item.id, is_acceptable: null }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  public resetForm(): void {
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

  public initArea(area: CaptureArea): FormGroup {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      items: this._fb.array(area.items)
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }
}