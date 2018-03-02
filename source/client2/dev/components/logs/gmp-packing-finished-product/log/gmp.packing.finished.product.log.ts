import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureEntry } from '../interfaces/gmp.packing.finished.product.capture.interface'
import { Log } from '../interfaces/gmp.packing.finished.product.log.interface'

@Component({
  selector: 'gmp-packing-finished-product-log',
  templateUrl: './gmp.packing.finished.product.log.html'
})

export class GMPPackingFinishedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { quality_types: [{ id: null, name: null }] } }
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
    this.setSuffix("gmp-packing-finished-product")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      entries: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['entries']

    control.push(this.initEmptyEntry())
  }

  public initEmptyEntry(): FormGroup {
    return this._fb.group({
      batch: [null, [Validators.required]],
      production_area_id: [null, [Validators.required, Validators.maxLength(255)]],
      supplier_id: [null, [Validators.required, Validators.maxLength(255)]],
      product_id: [null, [Validators.required, Validators.maxLength(255)]],
      customer_id: [null, [Validators.required, Validators.maxLength(255)]],
      quality_type_id: [null, [Validators.required]],
      origin: [null, [Validators.maxLength(3)]], // TODO: Añadir validador de tamaño exacto
      expiration_date: [null], // TODO: Añadir validador de fecha
      water_temperature: [null, [Validators.required]],
      product_temperature: [null, [Validators.required]],
      is_weight_correct: [null, [Validators.required]], // TODO: Añadir validador de booleano
      is_label_correct: [null, [Validators.required]], // TODO: Añadir validador de booleano
      is_trackable: [null, [Validators.required]], // TODO: Añadir validador de booleano
      notes: [null, [Validators.maxLength(65535)]],
      album_url: [null, [Validators.maxLength(65535)]]
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
    let control = <FormArray>this.captureForm.controls['areas']
    if (control.controls.length > 1) {
      let control = <FormArray>this.captureForm.controls['areas']
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  save() {
    //console.log(((this.captureForm.controls.entries as FormArray).controls[0] as FormGroup).controls.is_weight_correct)
    //console.log(this.captureForm)
    console.log(this.captureForm.value)
    //console.log(this.captureForm.valid)
  }
}