import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.packing.finished.product.log.interface'

@Component({
  selector: 'gmp-packing-finished-product-log',
  templateUrl: './gmp.packing.finished.product.log.html'
})

export class GMPPackingFinishedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { quality_types: [{ id: null, name: null }] } }
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

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-finished-product')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      entries: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['entries']

    control.push(this.initEmptyEntry())
  }

  public initEmptyEntry(): FormGroup {
    return this._fb.group({
      batch: ['', [Validators.required, Validators.maxLength(255)]],
      production_area_id: ['', [Validators.required, Validators.maxLength(255)]],
      supplier_id: ['', [Validators.required, Validators.maxLength(255)]],
      product_id: ['', [Validators.required, Validators.maxLength(255)]],
      customer_id: ['', [Validators.required, Validators.maxLength(255)]],
      quality_type_id: ['', [Validators.required]],
      origin: ['', [Validators.maxLength(3)]], // TODO: Añadir validador de tamaño exacto
      expiration_date: ['', [CustomValidators.dateValidator()]],
      water_temperature: ['', [Validators.required]],
      product_temperature: ['', [Validators.required]],
      is_weight_correct: [null, [Validators.required]],
      is_label_correct: [null, [Validators.required]],
      is_trackable: [null, [Validators.required]],
      notes: ['', [Validators.maxLength(65535)]],
      album_url: ['', [Validators.maxLength(65535)]]
    })
  }

  resetForm() {
    // Para bitacoras basadas en entradas, se debe reiniciar el formulario como
    // si cargaramos nuevamente el componente
    this.initForm()
  }

  public addEntry(): void {
    let control = <FormArray>this.captureForm.controls['entries']
    control.push(this.initEmptyEntry())
  }

  public removeEntry(): void {
    let control = <FormArray>this.captureForm.controls['entries']
    if (control.controls.length > 1) {
      let control = <FormArray>this.captureForm.controls['entries']
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  public cleanForm(): void {
    const entries = <FormArray>this.captureForm.controls.entries

    for (let entry of entries.controls) {
      const dateControl = (<FormGroup>entry).controls.expiration_date
      const originControl = (<FormGroup>entry).controls.origin
      const notesControl = (<FormGroup>entry).controls.notes
      const albumControl = (<FormGroup>entry).controls.album_url
      if (dateControl.value == null || dateControl.value == '') {
        dateControl.disable()
      }
      if (originControl.value == null || originControl.value == '') {
        originControl.disable()
      }
      if (notesControl.value == null || notesControl.value == '') {
        notesControl.disable()
      }
      if (albumControl.value == null || albumControl.value == '') {
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