import { Component, Input, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'

import { Language } from 'angular-l10n'

import { CaptureLog, CaptureItem } from '../interfaces/gmp.packing.cold.room.temp.capture.interface'
import { Log } from '../interfaces/gmp.packing.cold.room.temp.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { ToastService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/app.logs'
import { SuperLogComponent } from '../../super-logs/super.logs.log'

@Component({
  selector: 'gmp-packing-cold-room-temp-log',
  templateUrl: './gmp.packing.cold.room.temp.log.html'
})

export class GMPPackingColdRoomTempLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toasts: ToastService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-cold-room-temp")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      time: [currentTime, [Validators.required]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: null, deficiencies: "", corrective_action: "" }))
    }
  }

  resetForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, deficiencies: "", corrective_action: "" })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      items: items
    })
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      deficiencies: [item.deficiencies],
      corrective_action: [item.corrective_action]
    })
  }
}