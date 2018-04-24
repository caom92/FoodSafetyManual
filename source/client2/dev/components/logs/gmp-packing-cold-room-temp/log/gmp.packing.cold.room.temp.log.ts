import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.cold.room.temp.capture.interface'
import { Log } from '../interfaces/gmp.packing.cold.room.temp.log.interface'
import { CustomValidators } from '../../../../directives/custom.validators';

@Component({
  selector: 'gmp-packing-cold-room-temp-log',
  templateUrl: './gmp.packing.cold.room.temp.log.html'
})

export class GMPPackingColdRoomTempLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
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
    this.setSuffix("gmp-packing-cold-room-temp")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      time: [currentTime, [Validators.required]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: null, humidity: null, deficiencies: "", corrective_action: "" }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate(new Date())
    const currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, humidity: null, deficiencies: "", corrective_action: "" })
    }
    this.captureForm.reset({
      date: currentDate,
      time: currentTime,
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      humidity: [item.humidity],
      deficiencies: [item.deficiencies],
      corrective_action: [item.corrective_action]
    })
  }
}