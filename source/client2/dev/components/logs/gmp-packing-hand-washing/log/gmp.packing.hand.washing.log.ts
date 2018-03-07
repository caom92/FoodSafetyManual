import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { Language } from 'angular-l10n'

import { CaptureItem } from '../interfaces/gmp.packing.hand.washing.capture.interface'
import { Log } from '../interfaces/gmp.packing.hand.washing.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { TranslationService } from '../../../../services/app.translation'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperLogComponent } from '../../super-logs/super.logs.log'

@Component({
  selector: 'gmp-packing-hand-washing-log',
  templateUrl: './gmp.packing.hand.washing.log.html'
})

export class GMPPackingHandWashingLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-hand-washing")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, is_acceptable: false }))
    }
  }

  resetForm() {
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, is_acceptable: false })
    }
    this.captureForm.reset({
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
}