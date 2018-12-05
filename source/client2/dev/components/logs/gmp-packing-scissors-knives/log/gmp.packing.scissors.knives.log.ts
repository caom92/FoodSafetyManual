import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.scissors.knives.capture.interface'
import { Log } from '../interfaces/gmp.packing.scissors.knives.log.interface'
import { CustomValidators } from '../../../../directives/custom.validators'

@Component({
  selector: 'gmp-packing-scissors-knives-log',
  templateUrl: './gmp.packing.scissors.knives.log.html'
})

export class GMPPackingScissorsKnivesLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, quantity: null }] }
  @Language() lang: string


  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-scissors-knives')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, time: currentTime, approved: false, condition: false, is_sanitized: false, corrective_action: '' }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, time: currentTime, approved: false, condition: false, is_sanitized: false, corrective_action: '' })
    }
    this.captureForm.reset({
      date: currentDate,
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
}