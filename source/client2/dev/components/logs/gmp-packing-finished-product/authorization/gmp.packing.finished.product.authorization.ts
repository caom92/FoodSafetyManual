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
import { Authorization, AuthorizationEntry } from '../interfaces/gmp.packing.finished.product.authorization.interface'
import { CustomValidators } from '../../../../directives/custom.validators'

@Component({
  selector: 'gmp-packing-finished-product-authorization',
  templateUrl: './gmp.packing.finished.product.authorization.html'
})

export class GMPPackingFinishedProductAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, log_info: { quality_types: [{ id: null, name: null }], entries: [] } }
  @Language() lang: string

  readonly maxLengths = {
    batch: 255,
    production_area_id: 255,
    supplier_id: 255,
    product_id: 255,
    customer_id: 255,
    origin: 3,
    notes: 65535,
    album_url: 65535
  }

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
    this.setSuffix("gmp-packing-finished-product")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      entries: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['entries']

    for (const entry of this.log.log_info.entries) {
      control.push(this.initEntry(entry))
    }
  }

  public initEntry(entry: AuthorizationEntry): FormGroup {
    return this._fb.group({
      batch: [entry.batch, [Validators.required, Validators.maxLength(255)]],
      production_area_id: [entry.production_area, [Validators.required, Validators.maxLength(255)]],
      supplier_id: [entry.supplier, [Validators.required, Validators.maxLength(255)]],
      product_id: [entry.product, [Validators.required, Validators.maxLength(255)]],
      customer_id: [entry.customer, [Validators.required, Validators.maxLength(255)]],
      quality_type_id: [entry.quality_id, [Validators.required]],
      origin: [entry.origin, [Validators.maxLength(3)]], // TODO: Añadir validador de tamaño exacto
      expiration_date: [entry.expiration_date, [CustomValidators.dateValidator()]], // TODO: Añadir validador de fecha
      water_temperature: [entry.water_temperature, [Validators.required]],
      product_temperature: [entry.product_temperature, [Validators.required]],
      is_weight_correct: [(entry.is_weight_correct == 1) ? true : (entry.is_weight_correct == 0) ? false : null, [Validators.required]],
      is_label_correct: [(entry.is_label_correct == 1) ? true : (entry.is_label_correct == 0) ? false : null, [Validators.required]],
      is_trackable: [(entry.is_trackable == 1) ? true : (entry.is_trackable == 0) ? false : null, [Validators.required]],
      notes: [entry.notes, [Validators.maxLength(65535)]],
      album_url: [entry.album_url, [Validators.maxLength(65535)]]
    })
  }
}