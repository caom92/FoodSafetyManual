import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureEntry } from '../interfaces/gmp.packing.aged.product.capture.interface'
import { Log } from '../interfaces/gmp.packing.aged.product.log.interface'

@Component({
  selector: 'gmp-packing-aged-product-log',
  templateUrl: './gmp.packing.aged.product.log.html'
})

export class GMPPackingAgedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { actions: [{ id: null, name: null }], quality_types: [{ id: null, name: null }] } }
  @Language() lang: string
  entries: Array<number> = []

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
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
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      entries: this._fb.array([])
    })
    this.entries = []

    const control = <FormArray>this.captureForm.controls['entries']

    control.push(this.initEmptyEntry())
    this.entries.push(this.entries.length + 1)
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
      origin: ["",  [Validators.required]]
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
    let control = <FormArray>this.captureForm.controls['entries']
    control.push(this.initEmptyEntry())
    this.entries.push(this.entries.length + 1)
  }

  public removeEntry(): void {
    if(this.entries.length > 1){
      let control = <FormArray>this.captureForm.controls['entries']
      control.controls.pop()
      this.entries.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }
}