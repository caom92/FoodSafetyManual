import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gap.others.unusual.occurrence.log.interface'

@Component({
  selector: 'gap-others-unusual-occurrence-log',
  templateUrl: './gap.others.unusual.occurrence.log.html'
})

export class GAPOthersUnusualOccurrenceLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: { shifts: [{ shift_id: null, name: null }] } }
  @Language() lang: string

  readonly maxLengths = {
    area_id: 255,
    product_id: 255,
    batch: 255,
    description: 65535,
    corrective_action: 65535,
    album_url: 255
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationConfig: TranslationConfigService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix('gap-others-unusual-occurrence')
    super.ngOnInit()
  }

  initForm() {
    const currentTime = this.timeService.getISOTime(new Date())
    const currentDate = this.timeService.getISODate(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      time: [currentTime, [Validators.required, CustomValidators.timeValidator()]],
      incident_date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      shift_id: [null, [Validators.required]],
      area_id: ['', [Validators.required, Validators.maxLength(this.maxLengths.area_id)]],
      product_id: ['', [Validators.required, Validators.maxLength(this.maxLengths.product_id)]],
      batch: ['', [Validators.required, Validators.maxLength(this.maxLengths.batch)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxLengths.description)]],
      corrective_action: ['', [Validators.required, Validators.maxLength(this.maxLengths.corrective_action)]],
      album_url: ['', [Validators.required, Validators.maxLength(this.maxLengths.album_url)]]
    })
  }

  resetForm() {
    const currentTime = this.timeService.getISOTime(new Date())
    const currentDate = this.timeService.getISODate(new Date())
    this.captureForm.reset({
      date: currentDate,
      time: currentTime,
      incident_date: currentDate,
      shift_id: null,
      area_id: '',
      product_id: '',
      batch: '',
      description: '',
      corrective_action: '',
      album_url: ''
    })
  }
}