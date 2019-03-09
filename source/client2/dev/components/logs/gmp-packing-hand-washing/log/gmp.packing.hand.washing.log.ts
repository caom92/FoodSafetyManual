import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.hand.washing.capture.interface'
import { Log } from '../interfaces/gmp.packing.hand.washing.log.interface'

@Component({
  selector: 'gmp-packing-hand-washing-log',
  templateUrl: './gmp.packing.hand.washing.log.html'
})

export class GMPPackingHandWashingLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
  @Language() lang: string

  readonly maxLengths = {
    notes: 65535
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationConfig: TranslationConfigService,
    logService: LogService,
    toastService: ToastsService) {
    super(logService, toastService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-hand-washing')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.maxLength(this.maxLengths.notes)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, is_acceptable: false }))
    }
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }

  public resetForm(): void {
    const currentDate = this.timeService.getISODate()
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, is_acceptable: false })
    }
    this.captureForm.reset({
      date: currentDate,
      notes: '',
      items: items
    })
  }
}