import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.cold.room.temp.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.cold.room.temp.update.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-authorization',
  templateUrl: './gmp.packing.cold.room.temp.authorization.html'
})

export class GMPPackingColdRoomTempAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router, private langManager: LanguageService) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-cold-room-temp')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
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
