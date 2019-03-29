import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureArea, CaptureItem } from '../interfaces/gmp.packing.glass.brittle.capture.interface'
import { Log } from '../interfaces/gmp.packing.glass.brittle.log.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-log',
  templateUrl: './gmp.packing.glass.brittle.log.html'
})

export class GMPPackingGlassBrittleLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, quantity: null }] }] }
  @Language() lang: string

  readonly maxLengths = {
    notes: 65535
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-glass-brittle')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      time: [currentTime, [Validators.required, CustomValidators.timeValidator()]],
      notes: ['', [Validators.maxLength(this.maxLengths.notes)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      let itemControl = []
      for (let item of area.items) {
        itemControl.push(this.initItem({ id: item.id, is_acceptable: false }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  public resetForm(): void {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    let areas = []
    for (let area of this.log.areas) {
      let items = []
      for (let item of area.items) {
        items.push({ id: item.id, is_acceptable: false })
      }
      areas.push({ id: area.id, items: items })
    }
    this.captureForm.reset({
      date: currentDate,
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