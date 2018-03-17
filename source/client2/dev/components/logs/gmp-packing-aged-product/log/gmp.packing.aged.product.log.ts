import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureEntry } from '../interfaces/gmp.packing.aged.product.capture.interface'
import { Log } from '../interfaces/gmp.packing.aged.product.log.interface'
import { CustomValidators } from '../../../../directives/custom.validators';

@Component({
  selector: 'gmp-packing-aged-product-log',
  templateUrl: './gmp.packing.aged.product.log.html'
})

export class GMPPackingAgedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { actions: [{ id: null, name: null }], quality_types: [{ id: null, name: null }] } }
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
    this.setSuffix("gmp-packing-aged-product")
    super.ngOnInit()
    this.initForm()
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
      batch: ["", [Validators.required]],
      warehouse: ["", [Validators.required]],
      vendor: ["", [Validators.required]],
      item: ["", [Validators.required]],
      age: [0, [Validators.required]],
      quality_id: ["", [Validators.required]],
      packed_date: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      location: ["", [Validators.required]],
      action_id: ["", [Validators.required]],
      album_url: ["", [Validators.required]],
      notes: ["", [Validators.required]],
      origin: ["", [Validators.required]]
    })
  }

  public initEntry(entry: CaptureEntry): FormGroup {
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

  resetForm() {
    // Para bitacoras basadas en entradas, se debe reiniciar el formulario como
    // si cargaramos nuevamente el componente
    this.initForm()
  }

  public addEntry(): void {
    const control = <FormArray>this.captureForm.controls['entries']
    control.push(this.initEmptyEntry())
  }

  public removeEntry(): void {
    const control = <FormArray>this.captureForm.controls['entries']
    if (control.controls.length > 1) {
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
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