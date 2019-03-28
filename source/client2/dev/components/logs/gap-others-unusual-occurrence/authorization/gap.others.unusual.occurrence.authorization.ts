import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gap.others.unusual.occurrence.authorization.interface'

@Component({
  selector: 'gap-others-unusual-occurrence-authorization',
  templateUrl: './gap.others.unusual.occurrence.authorization.html'
})

export class GAPOthersUnusualOccurrenceAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, creation_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, items: { shifts: [{ shift_id: null, name: null }], entry: { incident_date: null, time: null, shift: null, shift_id: null, area: null, product_name: null, batch: null, description: null, corrective_action: null, album_url: null } } }
  @Language() lang: string

  readonly maxLengths = {
    area_id: 255,
    product_id: 255,
    batch: 255,
    description: 65535,
    corrective_action: 65535,
    album_url: 255
  }

  constructor(_fb: FormBuilder,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    routeState: ActivatedRoute,
    router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gap-others-unusual-occurrence')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      time: [this.log.items.entry.time.substring(0, 5), [Validators.required, CustomValidators.timeValidator()]],
      incident_date: [this.log.items.entry.incident_date, [Validators.required, CustomValidators.dateValidator()]],
      shift_id: [this.log.items.entry.shift_id, [Validators.required]],
      area_id: [this.log.items.entry.area, [Validators.required, Validators.maxLength(this.maxLengths.area_id)]],
      product_id: [this.log.items.entry.product_name, [Validators.required, Validators.maxLength(this.maxLengths.product_id)]],
      batch: [this.log.items.entry.batch, [Validators.required, Validators.maxLength(this.maxLengths.batch)]],
      description: [this.log.items.entry.description, [Validators.required, Validators.maxLength(this.maxLengths.description)]],
      corrective_action: [this.log.items.entry.corrective_action, [Validators.required, Validators.maxLength(this.maxLengths.corrective_action)]],
      album_url: [this.log.items.entry.album_url, [Validators.required, Validators.maxLength(this.maxLengths.album_url)]]
    })
  }
}