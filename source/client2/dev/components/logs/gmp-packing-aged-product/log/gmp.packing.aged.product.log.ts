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
import { Log } from '../interfaces/gmp.packing.aged.product.log.interface'

@Component({
  selector: 'gmp-packing-aged-product-log',
  templateUrl: './gmp.packing.aged.product.log.html'
})

export class GMPPackingAgedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { actions: [{ id: null, name: null }], quality_types: [{ id: null, name: null }] } }
  @Language() lang: string

  readonly maxLengths = {
    batch: 255,
    warehouse: 255,
    vendor: 255,
    item: 255,
    origin: 3,
    location: 255,
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

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-aged-product')
    super.ngOnInit()
  }

  public initForm(): void {
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
      batch: ['', [Validators.maxLength(this.maxLengths.batch)]],
      warehouse: ['', [Validators.maxLength(this.maxLengths.warehouse)]],
      vendor: ['', [Validators.required, Validators.maxLength(this.maxLengths.vendor)]],
      item: ['', [Validators.required, Validators.maxLength(this.maxLengths.item)]],
      age: [null, [Validators.required]],
      quality_id: [null, [Validators.required]],
      origin: ['', [CustomValidators.exactLength(this.maxLengths.origin)]],
      packed_date: ['', [Validators.required, CustomValidators.dateValidator()]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      location: ['', [Validators.maxLength(this.maxLengths.location)]],
      action_id: [null, [Validators.required]],
      notes: ['', [Validators.maxLength(this.maxLengths.notes)]],
      album_url: ['', [Validators.maxLength(this.maxLengths.album_url)]]
    })
  }

  public resetForm(): void {
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