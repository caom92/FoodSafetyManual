import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.cold.room.temp.capture.interface'
import { Log } from '../interfaces/gmp.packing.cold.room.temp.log.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-log',
  templateUrl: './gmp.packing.cold.room.temp.log.html'
})

export class GMPPackingColdRoomTempLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-cold-room-temp')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      time: [currentTime, [Validators.required]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: null, humidity: null, deficiencies: '', corrective_action: '' }))
    }
  }

  resetForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, humidity: null, deficiencies: '', corrective_action: '' })
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