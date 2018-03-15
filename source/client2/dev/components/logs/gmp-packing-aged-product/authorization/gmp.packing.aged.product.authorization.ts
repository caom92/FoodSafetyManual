import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationEntry } from '../interfaces/gmp.packing.aged.product.authorization.interface'

@Component({
  selector: 'gmp-packing-aged-product-authorization',
  templateUrl: './gmp.packing.aged.product.authorization.html'
})

export class GMPPackingAgedProductAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, log_info: { actions: [{ id: null, name: null }], quality_types: [{ id: null, name: null }], entries: [] } }
  @Language() lang: string

  constructor(_fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService,
    router: StateService) {
    super(_fb, logService, toasts, router)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-aged-product")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      entries: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['entries']

    for (const entry of this.log.log_info.entries) {
      control.push(this.initEntry(entry))
    }
  }

  public initEntry(entry: AuthorizationEntry): FormGroup {
    return this._fb.group({
      batch: [entry.batch, [Validators.required]],
      warehouse: [entry.warehouse, [Validators.required]],
      vendor: [entry.vendor, [Validators.required]],
      item: [entry.item, [Validators.required]],
      age: [entry.age, [Validators.required]],
      quality_id: [entry.quality_id, [Validators.required]],
      packed_date: [entry.packed_date, [Validators.required]],
      quantity: [entry.quantity, [Validators.required]],
      location: [entry.location, [Validators.required]],
      action_id: [entry.action_id, [Validators.required]],
      album_url: [entry.album_url, [Validators.required]],
      notes: [entry.notes, [Validators.required]],
      origin: [entry.origin, [Validators.required]]
    })
  }

  public save(): void {
    for (let entry in ((<FormGroup>this.captureForm.controls.entries).controls)) {
      let temp = (<FormGroup>this.captureForm.controls.entries).controls[entry] as FormGroup
      let tempAge = (+(new Date(this.captureForm.controls.date.value)) - + new Date(temp.controls.packed_date.value)) / (1000 * 60 * 60 * 24)
      if (tempAge == Number(tempAge)) {
        temp.controls.age.setValue(tempAge)
      }
    }

    super.save()
  }
}