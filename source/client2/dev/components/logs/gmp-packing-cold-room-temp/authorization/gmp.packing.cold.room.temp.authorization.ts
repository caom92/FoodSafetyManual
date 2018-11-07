import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.cold.room.temp.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.cold.room.temp.update.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-authorization',
  templateUrl: './gmp.packing.cold.room.temp.authorization.html'
})

export class GMPPackingColdRoomTempAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, time: null, items: [{ id: null, name: null, test: null, humidity: null, deficiencies: null, corrective_action: null }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, router: StateService, private langManager: LanguageService) {
    super(_fb, logService, toastService, router)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-cold-room-temp')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      time: [this.log.time, [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem({ id: item.id, test: item.test, humidity: item.humidity, deficiencies: item.deficiencies, corrective_action: item.corrective_action }))
    }
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      test: [item.test, [Validators.required]],
      humidity: [item.humidity],
      deficiencies: [item.deficiencies],
      corrective_action: [item.corrective_action]
    })
  }
}
