import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationEntry } from '../interfaces/gmp-packing-product-revision-authorization.interface'

@Component({
  selector: 'gmp-packing-product-revision-authorization',
  templateUrl: './gmp-packing-product-revision-authorization.component.html'
})

export class GMPPackingProductRevisionAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization

  readonly maxLengths = {
    batch: 255,
    production_area: 255,
    supplier: 255,
    product: 255,
    customer: 255,
    origin: 3,
    notes: 65535,
    album_url: 65535
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
    this.setSuffix('gmp-packing-product-revision')
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    // TODO: Esto se hace por la forma diferente en que llegan los datos del
    // servidor en comparación al servidor local; encontrar una solución
    for (let quality of this.log.log_info.quality_types) {
      quality.id = this.resolveNumber(quality.id)
    }

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
      batch: [this.resolveString(entry.batch), [Validators.required, Validators.maxLength(255)]],
      production_area: [this.resolveString(entry.production_area), [Validators.required, Validators.maxLength(255)]],
      supplier: [this.resolveString(entry.supplier), [Validators.required, Validators.maxLength(255)]],
      product: [this.resolveString(entry.product), [Validators.required, Validators.maxLength(255)]],
      customer: [this.resolveString(entry.customer), [Validators.required, Validators.maxLength(255)]],
      quality_type_id: [this.resolveNumber(entry.quality_id), [Validators.required]],
      origin: [this.resolveString(entry.origin), [Validators.maxLength(3)]], // TODO: Añadir validador de tamaño exacto
      expiration_date: [this.resolveString(entry.expiration_date), [CustomValidators.dateValidator()]], // TODO: Añadir validador de fecha
      water_temperature: [this.resolveNumber(entry.water_temperature), [Validators.required]],
      product_temperature: [this.resolveNumber(entry.product_temperature), [Validators.required]],
      is_weight_correct: [this.resolveBoolean(entry.is_weight_correct), [Validators.required]],
      is_label_correct: [this.resolveBoolean(entry.is_label_correct), [Validators.required]],
      is_trackable: [this.resolveBoolean(entry.is_trackable), [Validators.required]],
      notes: [this.resolveString(entry.notes), [Validators.maxLength(65535)]],
      album_url: [this.resolveString(entry.album_url), [Validators.maxLength(65535)]]
    })
  }

  public cleanForm(): void {
    const entries = <FormArray>this.captureForm.controls.entries

    for (let entry of entries.controls) {
      const dateControl = (<FormGroup>entry).controls.expiration_date
      const originControl = (<FormGroup>entry).controls.origin
      const notesControl = (<FormGroup>entry).controls.notes
      const albumControl = (<FormGroup>entry).controls.album_url
      if (dateControl.value === null || dateControl.value === '') {
        dateControl.disable()
      }
      if (originControl.value === null || originControl.value === '') {
        originControl.disable()
      }
      if (notesControl.value === null || notesControl.value === '') {
        notesControl.disable()
      }
      if (albumControl.value === null || albumControl.value === '') {
        albumControl.disable()
      }
    }
  }

  public enableForm(): void {
    const entries = <FormArray>this.captureForm.controls.entries

    for (let entry of entries.controls) {
      const dateControl = (<FormGroup>entry).controls.expiration_date
      const originControl = (<FormGroup>entry).controls.origin
      const notesControl = (<FormGroup>entry).controls.notes
      const albumControl = (<FormGroup>entry).controls.album_url

      dateControl.enable()
      originControl.enable()
      notesControl.enable()
      albumControl.enable()
    }
  }
}