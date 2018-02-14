import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.others.unusual.occurrence.log.interface'

@Component({
  selector: 'gmp-others-unusual-occurrence-log',
  templateUrl: './gmp.others.unusual.occurrence.log.html'
})

export class GMPOthersUnusualOccurrenceLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: { shifts: [{ shift_id: null, name: null }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-others-unusual-occurrence")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      time: [currentTime, [Validators.required]],
      incident_date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      shift_id: ["", [Validators.required]],
      area_id: ["", [Validators.required, Validators.maxLength(255)]],
      product_id: ["", [Validators.required, Validators.maxLength(255)]],
      batch_id: ["", [Validators.required, Validators.maxLength(255)]],
      description_id: ["", [Validators.required, Validators.maxLength(65535)]],
      corrective_action: ["", [Validators.required, Validators.maxLength(65535)]],
      album_url: ["", [Validators.required, Validators.maxLength(65535)]],
    })
  }

  resetForm() {
    /*let currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: "", corrective_action: "" })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      items: items
    })*/
  }

  save() {
    console.log(this.log.items.shifts)
  }
}